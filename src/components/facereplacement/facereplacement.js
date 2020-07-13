import React, { Component } from 'react';
import { loadModels, getFullFaceDescription, createMatcher, setDetectionSize, createMatcherReplace } from '../../services/recognition/recognition';
import * as faceapi from 'face-api.js';
import Jimp from 'jimp';

// Initial State
const INIT_STATE = {
    recognitionImages: null,
    recognitionImagesArr: [],
    imageURL: null,
    image: null,
    fsImage: null,
    fullDesc: null,
    detections: null,
    descriptors: null,
    match: null,
    jimp: null,
    reverse: null,
    replaceImage: null,
};

class FaceReplacement extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE, faceMatcher: null }
    }

    // Used to load all the descriptor models for Face-API that will be used
    componentDidMount = async () => {
        await loadModels();
    };

    // This function checks gets the descriptors from the file to replace/redact faces from and compares it to
    // the descriptors of the faces from the array of images that was given by the user to detect from
    // Once the descriptors of each of the recognition faces and the detection image has been found,
    // the matches are sent to be edited via blurring or replacing the faces
    handleImage = async () => {
        console.log("Rep 5")
        if (this.state.imageURL === null || this.state.recognitionImagesArr.length === 0) {
            return
        }
        console.log("Image = ", this.state.imageURL)
        const description = await getFullFaceDescription(this.state.imageURL)
        const matcher = await createMatcherReplace(this.state.recognitionImagesArr)
        this.setState({ faceMatcher: matcher })
        console.log("Matcher = ", this.state.faceMatcher)
        if (!!description) {
            const mappedDetections = description.map(fd => fd.detection)
            this.setState({
                description,
                detections: mappedDetections,
                descriptors: description.map(fd => fd.descriptor)
            });
        }
        if (!!this.state.descriptors && !!this.state.faceMatcher) {
            console.log("State descriptors = ", this.state.descriptors)
            let matches = []
            await this.state.descriptors.map(descriptor => {
                const match = this.state.faceMatcher.findBestMatch(descriptor)
                matches.push(match)
            });
            console.log("matches = ", matches)
            this.setState({ matches }, async () => {
                await this.setFsImage()
                await this.editImage();
            });
        }
    };

    // Sets the image that will be used to put on the matched or reversed faces
    setReplaceImage = async event => {
        console.log("Rep 4")
        if (event.target.files.length > 0) {
            this.setState({
                replaceImage: URL.createObjectURL(event.target.files[0])
            }, () => {
                console.log("replace image = ", this.state.replaceImage)
            })
        }
    }

    // Sets whether or not the function will replace/blur the given faces or all the faces but the given faces
    setReversed = async () => {
        const remember = document.getElementById('reversed')
        if (remember.checked) {
            this.setState({
                reverse: true
            })
        } else {
            this.setState({
                reverse: false
            })
        }
    }


    // Sets all the files to detect the original faces from
    handleRecognitionChange = async event => {
        console.log("Rep 2")
        this.resetState();
        if (event.target.files.length > 0) {
            this.setState({
                recognitionImages: event.target.files,
                loading: true
            }, () => {
                console.log("Recognition Images = ", this.state.recognitionImages)
            })
        }
    };


    // Sets the file of the recognition image that will be edited by the program for replacement/redaction
    handleFileChange = async event => {
        console.log("Rep 3")
        if (event.target.files.length > 0) {
            this.setState({
                imageURL: URL.createObjectURL(event.target.files[0]),
                image: event.target.files[0],
                loading: true
            }, () => {
                console.log("Image URL = ", this.state.imageURL)
            });
        }
    };

    resetState = () => {
        this.setState({ ...INIT_STATE });
    };

    async setFsImage() {
        this.setState({ fsImage: await faceapi.bufferToImage(this.state.image) })
    }

    async getBufferImage(image) {
        return await faceapi.bufferToImage(image)
    }


    // This function gets recognition image that will be edited and edits the image by blurring/replacing all
    // the matching faces from the detection image or if the reversed option was checked it will replace all but
    // the matching faces
    // The result is then displayed to the user and can be downloaded
    async editImage() {
        const image = await Jimp.read(this.state.imageURL)
        console.log("Jimp image = ", image)
        const findBoxes = await this.getBoxes()
        console.log("findBoxes = ", findBoxes)

        if (this.state.replaceImage) {
            const replace = await Jimp.read(this.state.replaceImage)
            findBoxes.forEach((box, i) => {
                const replaceClone = replace.clone()
                replaceClone.resize(box.width * 1.3, box.height * 1.3)
                image.blit(replaceClone, box.x * 0.95, box.y * 0.7)
            })
        } else {
            findBoxes.forEach((box, i) => {
                image.pixelate(25, box.x, box.y, box.width, box.height)
            })
        }

        const file = await image.getBase64Async(Jimp.MIME_JPEG)
        console.log("blurred image = ", file)
        const downloadBtn = document.getElementById('download')
        while (downloadBtn.firstChild) {
            downloadBtn.removeChild(downloadBtn.firstChild);
        }

        const container = document.createElement('div')
        downloadBtn.append(container)

        const blurredImage = document.createElement("img")
        blurredImage.src = file
        blurredImage.width = 414
        blurredImage.height = this.state.fsImage.height * (414 / this.state.fsImage.width)
        container.append(blurredImage)


        const createA = document.createElement("a")
        createA.href = file
        createA.download = "FILENAME"
        createA.text = "Download File"
        createA.className = "b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        container.append(createA)
    }

    // This gets all the bounding box faces from the recognition photo that either match the detection faces
    // or don't match the detection faces if the reversed option is checked
    async getBoxes() {
        let box = []
        this.state.matches.forEach((result, i) => {
            console.log("result toString ", i, " = ", result.toString())
            if (this.state.reverse === true) {
                console.log("teeters")
                if (result.toString().startsWith('unknown')) {
                    box.push(this.state.detections[i].box)
                }
            } else {
                console.log("yeeters")
                if (!result.toString().startsWith('unknown')) {
                    box.push(this.state.detections[i].box)
                }
            }
        })
        console.log("mah boxes be = ", box)
        return box
    }

    render() {
        return (
            <div>
                <div class="bg-black-60">
                    <article class="cf" style={{ position: 'relative', height: '100%', display: 'inline-block' }}>
                        <div class="fl w-50-ns tc">
                            <div class="pa4 black-80 w-100" style={{ position: 'relative', height: '100%', display: 'inline-block' }}>
                                <form class="measure center w-100 pa4 br3 shadow-5 center bg-white" style={{ position: 'relative', height: '100%', display: 'inline-block' }} >
                                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                                        <legend class="f4 fw6 ph0 mh0">Recognition Entries</legend>
                                        <div class="mv3">
                                            <label class="db fw6 lh-copy f6" for="myRecognitionUpload">Image of People</label>
                                            <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90 br-pill no-underline ba grow"
                                                id="myRecognitionUpload"
                                                type="file"
                                                onChange={this.handleRecognitionChange}
                                                accept=".jpg, .jpeg, .png"
                                                multiple />
                                        </div>
                                        <div>
                                            <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Add Images!" type="button" onClick={this.storeFileDetections} />
                                        </div>
                                        <div class="mv3">
                                            <label class="db fw6 lh-copy f6" for="myReplaceUpload">Image to replace faces</label>
                                            <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90 br-pill no-underline ba grow"
                                                id="myReplaceUpload"
                                                type="file"
                                                onChange={this.setReplaceImage}
                                                accept=".jpg, .jpeg, .png" />
                                        </div>
                                        <div class="mv3">
                                            <label class="db fw6 lh-copy f6" for="myFileUpload">Replacement Image</label>
                                            <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90 br-pill no-underline ba grow"
                                                id="myFileUpload"
                                                type="file"
                                                onChange={this.handleFileChange}
                                                accept=".jpg, .jpeg, .png" />
                                        </div>
                                        <label class="pa0 ma0 lh-copy f6 pointer"><input
                                            id="reversed"
                                            type="checkbox"
                                            onClick={this.setReversed} /> Reverse Selections</label>
                                    </fieldset>
                                    <div>
                                        <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Replace Faces!" type="button" onClick={this.handleImage} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="fl w-50-ns bg-transparent tc">
                            <div class="pa3 w-100 center" style={{ position: 'relative', height: '100%', display: 'inline-block' }}>
                                <form class="bg-white hide-child relative ba w-100 pa4 br3 measure shadow-5 center" style={{ position: 'relative', width: '500px' }}>
                                    <div id="download" style={{ position: 'relative' }}>
                                        <img src="./blur-example.jpg" class="db" alt="" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default FaceReplacement;
