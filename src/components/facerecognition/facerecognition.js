import React, { Component } from 'react';
import { loadModels, getFullFaceDescription, createMatcher, setDetectionSize, createMatcherRecog } from '../../services/recognition/recognition';
import * as faceapi from 'face-api.js';

// Initial State
const INIT_STATE = {
    imageURL: null,
    image: null,
    detectionURL: null,
    detectionImage: null,
    fullDesc: null,
    detections: null,
    descriptors: null,
    match: null,
    found: "False",
};


class FaceRecognition extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE, faceMatcher: null, name: null, user: props.user, deleteName: null, };
    }

    // Used to load all the descriptor models for Face-API that will be used
    componentDidMount = async () => {
        console.log("Here 1")
        await loadModels()
    }

    // Calls the Re-Do API to store recognised descriptors for an individual under the user's account information
    storeDescriptors = async (descriptors) => {
        console.log("User ID = ", this.state.user, " Descriptors = ", descriptors)
        fetch("", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: this.props.user.id,
                descriptors: descriptors
            })
        })
            .then(response => response.json())
    }

    // Deletes a specific person's descriptors from a user's account by calling the deleteface function of Re-Do's API
    deleteDescriptors = async () => {
        const confirm = window.confirm("Are you sure you want to delete this entry?")
        if (confirm) {
            console.log("User ID = ", this.state.user, " Name to delete = ", this.state.name)
            fetch("", {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: this.props.user.id,
                    name: this.state.name
                })
            })
                .then(response => response.json())
        } else {
            return
        }
    }

    // Retrieves all saved descriptors for stored images for a specific user from Re-Do's API
    // Creates a faceMatcher from the retrieved descriptors that will be used as the matching descriptors when
    // a recognition file is uploaded
    getAllDescriptors = async () => {
        fetch("", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: this.props.user.id,
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log("descriptors = ", response)
                createMatcherRecog(response)
                    .then(res => {
                        console.log("Res = ", res)
                        this.setState({ faceMatcher: res })
                    })
            })
        return "Done"
    }

    // This function is used to both get the current descriptors of the recognition photo, along with
    // comparing all the descriptors that have been found in the current photo with the faceMatcher object.
    // The faceMatcher object is either retrieved and set from Re-Do's database if the user is signed in,
    // or is set from the recognition photo and name.
    handleImage = async (image = this.state.imageURL, name = this.state.name) => {
        console.log("In HandleImage")
        const description = await getFullFaceDescription(image)
        if (!!description) {
            console.log("Setting detections")
            const mappedDetections = description.map(fd => fd.detection)
            const detect = await this.resizeDetection(mappedDetections)
            this.setState({
                description,
                detections: detect,
                descriptors: description.map(fd => fd.descriptor)
            }, () => {
                console.log("After description setState ", this.state.faceMatcher, this.state.detections, this.state.descriptors)
            })
        }
        if (!!this.state.descriptors && !!this.state.faceMatcher) {
            console.log("Setting matches")
            let match = await this.state.descriptors.map(descriptor =>
                this.state.faceMatcher.findBestMatch(descriptor)
            )
            this.setState({ match }, async () => {
                await this.drawCanvas();
            })
        }
    }

    // This function checks the id of the caller, and sets the images and URLs of the photos for either the
    // recognition or detection images
    handleFileChange = async event => {
        const id = event.target.id
        if (event.target.files.length > 0) {
            if (id === 'myRecognitionUpload') {
                this.resetState();
                this.setState({
                    detectionURL: URL.createObjectURL(event.target.files[0]),
                    detectionImage: event.target.files[0],
                    loading: true
                }, () => {
                    console.log("Detection URL ", this.state.detectionURL, " Detection Image ", this.state.detectionImage)
                })
            } else {
                this.setState({
                    imageURL: URL.createObjectURL(event.target.files[0]),
                    image: event.target.files[0],
                    loading: true
                }, () => {
                    console.log("Image URL ", this.state.imageURL, " Image ", this.state.image)
                })
            }
        }
    };

    // This calls the setDBDescriptor function when the parameters for storing into the database are met
    storeImage = async () => {
        if (this.state.name.length > 0 && this.state.detectionURL != null) {
            await this.setDBDescriptor(this.state.detectionURL, this.state.name)
                .then(done => {
                    console.log(done)
                })
                .then(await this.getAllDescriptors())
        }
    }

    // This function checks to see if the user is signed in. If they are signed in, all the stored descriptors for
    // the user in Re-Do's database is retrieved and used as recognition descriptors to compare with the recognition image
    // If the user is not signed in, it takes the current detection image and creates the descriptors from there to compare
    // with the recognition image
    runDetections = async () => {
        if (this.props.signedIn === true) {
            await this.getAllDescriptors()
                .then(done => {
                    console.log("All descriptors found, they are = ", this.state.faceMatcher)
                    this.handleImage()
                })
        } else {
            if (this.state.detectionURL === null || this.state.name === null || this.state.name === '') { return }
            console.log("Detection URL in runDetections = ", this.state.detectionURL, " Name = ", this.state.name)
            await this.setRecognitionMatcher(this.state.detectionURL, this.state.name)
                .then(done => {
                    console.log(done)
                    this.handleImage()
                })
        }
    }

    // Sets the name of the person in the descriptor image
    handleNameChange = async event => {
        if (event.target.id === 'nameUpload') {
            this.setState({
                name: event.target.value,
            }, () => {
                console.log("nameUpload = ", this.state.name)
            })
        } else if (event.target.id === 'nameDelete') {
            this.setState({
                name: event.target.value,
            }, () => {
                console.log("nameDelete = ", this.state.name)
            })
        }
    }

    resetState = () => {
        this.setState({ ...INIT_STATE });
    }

    async setImage() {
        this.setState({ image: await faceapi.bufferToImage(this.state.image) })
    }

    // Resizes the display image to fit into the canvas on the web page. Used to keep a static image width
    // and find detections based on the new image sizes
    async resizeDetection(detections) {
        console.log("Current image = ", this.state.image)
        await this.setImage()
        const image = this.state.image;
        console.log("Image after setImage = ", image)
        const displaySize = this.getDisplaySize()
        const resizedDetections = await setDetectionSize(detections, displaySize)
        return resizedDetections
    }

    // Returns a static image width of 414 for the canvas with a height based on the same ratio of the original image
    getDisplaySize = () => {
        const displaySize = { width: 414, height: this.state.image.height * (414 / this.state.image.width) }
        return displaySize
    }

    // Takes the recognition image and resizes it to the display size canvas. Recognition faces and boxes are resized to the
    // new image size and drawn onto the photo. This photo is then displayed to the user showing all detections found.
    async drawCanvas() {
        let ogCanvas = document.getElementById('newCanvas')
        while (ogCanvas.firstChild) {
            ogCanvas.removeChild(ogCanvas.firstChild);
        }
        const container = document.createElement('div')
        container.style.position = 'relative'
        container.style.display = 'inline-block'
        ogCanvas.append(container)

        let image
        let canvas

        image = this.state.image
        image.height = image.height * (414 / image.width)
        image.width = 414
        image.style.zIndex = '1'
        image.style.position = 'absolute'
        container.append(image)
        canvas = await faceapi.createCanvasFromMedia(image)
        canvas.style.position = 'relative'
        //canvas.className = 'center'
        canvas.style.zIndex = '100'
        container.append(canvas)
        const displaySize = this.getDisplaySize()
        faceapi.matchDimensions(canvas, displaySize)

        const results = this.state.match
        const detections = this.state.detections
        console.log('results = ', results, ' detections = ', detections)

        results.forEach((result, i) => {
            const box = detections[i].box
            if (!result.toString().startsWith('unknown')) {
                this.setState({ found: "True" })
            }
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
            drawBox.draw(canvas)
        })
    }

    render() {
        return (
            <div class="bg-black-60">
                <article class="cf" style={{ position: 'relative', height: '100%', display: 'inline-block' }}>
                    <div class="fl w-50-ns tc">
                        <div class="pa4 black-80 w-100" style={{ position: 'relative', height: '100%', display: 'inline-block' }}>
                            <form class="measure center w-100 pa4 br3 shadow-5 center bg-white" style={{ position: 'relative', height: '100%', display: 'inline-block' }} >
                                <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                                    <legend class="f4 fw6 ph0 mh0">Recognition Entries</legend>
                                    <div class="mt3">
                                        <label class="db fw6 lh-copy f6" for="nameUpload">Name of Person:</label>
                                        <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90"
                                            id="nameUpload"
                                            type="text"
                                            onChange={this.handleNameChange} />
                                    </div>
                                    {this.props.signedIn === true ?
                                        <div>
                                            <div class="mv3">
                                                <label class="db fw6 lh-copy f6" for="myRecognitionUpload">Image of Person</label>
                                                <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90 br-pill no-underline ba grow"
                                                    id="myRecognitionUpload"
                                                    type="file"
                                                    onChange={this.handleFileChange}
                                                    accept=".jpg, .jpeg, .png" />
                                            </div>
                                            <div>
                                                <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Store Image" type="button" onClick={this.storeImage} />
                                            </div>
                                            <div>
                                                <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Load All Stored Descriptors" type="button" onClick={this.getAllDescriptors} />
                                            </div>
                                        </div>
                                        :
                                        <div class="mv3">
                                            <label class="db fw6 lh-copy f6" for="myRecognitionUpload">Image of Person</label>
                                            <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90 br-pill no-underline ba grow"
                                                id="myRecognitionUpload"
                                                type="file"
                                                onChange={this.handleFileChange}
                                                accept=".jpg, .jpeg, .png" />
                                        </div>
                                    }
                                    <div class="mv3">
                                        <label class="db fw6 lh-copy f6" for="myFileUpload">Recognition Image</label>
                                        <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90 br-pill no-underline ba grow"
                                            id="myFileUpload"
                                            type="file"
                                            onChange={this.handleFileChange}
                                            accept=".jpg, .jpeg, .png" />
                                    </div>
                                </fieldset>
                                <div>
                                    <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Recognise Faces!" type="button" onClick={this.runDetections} />
                                </div>
                            </form>
                        </div>
                        {this.props.signedIn === true &&
                            <div class="pa4 black-80 w-100" style={{ position: 'relative', height: '100%', display: 'inline-block' }}>
                                <form class="measure center w-100 pa4 br3 shadow-5 center bg-white" style={{ position: 'relative', height: '100%', display: 'inline-block' }} >
                                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                                        <legend class="f4 fw6 ph0 mh0">Delete Saved Entries</legend>
                                        <div class="mt3">
                                            <label class="db fw6 lh-copy f6" for="nameDelete">Name of Person:</label>
                                            <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90"
                                                id="nameDelete"
                                                type="text"
                                                onChange={this.handleNameChange} />
                                        </div>
                                    </fieldset>
                                    <div>
                                        <div>
                                            <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Delete Descriptors" type="button" onClick={this.deleteDescriptors} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                    <div class="fl w-50-ns bg-transparent tc">
                        <div class="pa3 w-100 center" style={{ position: 'relative', height: '100%', display: 'inline-block' }}>
                            <form class="bg-white hide-child relative ba w-100 pa4 br3 measure shadow-5 center" style={{ position: 'relative', width: '500px' }}>
                                <div id="newCanvas" style={{ position: 'relative' }}>
                                    <img src="./recog-example.png" class="db" alt="" />
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </div>

        );
    }
}

export default FaceRecognition;
