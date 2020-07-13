import * as faceapi from 'face-api.js';

// Loads all the models to use for Face API detection
export async function loadModels() {
    console.log("Here 2")
    await faceapi.loadTinyFaceDetectorModel('/models')
    await faceapi.loadFaceLandmarkTinyModel('/models')
    await faceapi.loadFaceRecognitionModel('/models')
}

// This function sets the type of facial detection to use and then calls the Face-API on each image to detect
// each face in the images and returns a set of descriptions for each face. These descriptors are used for
// recognition.
export async function getFullFaceDescription(blob, inputSize = 512) {
    // Sets the thresholds and initial values for tiny face detection
    let scoreThreshold = 0.5;
    const OPTION = new faceapi.TinyFaceDetectorOptions({
        inputSize,
        scoreThreshold
    })
    const useTinyModel = true;
    console.log("Blob value = ", console.log(blob))

    // Checks if the blob is a singular image or an array of images
    // If a single image, returns a single description set for the faces in the image
    // If multiple images, loops through the image array, adds the descriptions to a
    // descriptions array, and returns that array to be used later on
    if (typeof blob === 'string') {
        let img = await faceapi.fetchImage(blob);
        console.log(img)
        let fullDesc = await faceapi
            .detectAllFaces(img, OPTION)
            .withFaceLandmarks(useTinyModel)
            .withFaceDescriptors();
        console.log(fullDesc)
        return fullDesc;
    } else {
        let desArr = []
        await blob.forEach(async function (blobImg) {
            let img = await faceapi.fetchImage(blobImg);
            console.log(img)
            let fullDesc = await faceapi
                .detectAllFaces(img, OPTION)
                .withFaceLandmarks(useTinyModel)
                .withFaceDescriptors();
            console.log("Fulldesc = ", fullDesc)
            fullDesc.forEach(value => {
                desArr.push(value.descriptor)
            })
        })
        return desArr
    }
}

// This function takes all the descriptors for a given face and creates a face matcher object from them
// The face matcher object is used to compare faces in recognition images to compute whether or not
// the detection face has been found.
const maxDescriptorDistance = 0.5;
export async function createMatcher(faceProfile) {
    console.log("FaceProfile = ", faceProfile)
    let members = Object.keys(faceProfile);
    console.log('members = ', members)
    let labeledDescriptors = []
    members.map(
        member => {
            let descriptors = [
                new Float32Array(faceProfile[member].descriptor)
            ]
            console.log('member = ', member, ' descriptors = ', descriptors)
            if (!faceProfile[member].name) {
                faceProfile[member].name = ''
            }
            console.log("descriptor = ", descriptors)
            const labelDescriptor = new faceapi.LabeledFaceDescriptors(
                faceProfile[member].name,
                descriptors
            )
            labeledDescriptors.push(labelDescriptor)
        }
    )

    console.log('labeledDescriptors = ', labeledDescriptors)

    // Create face matcher (maximum descriptor distance is 0.5)
    let faceMatcher = new faceapi.FaceMatcher(
        labeledDescriptors,
        maxDescriptorDistance
    )

    return faceMatcher
}

// This function resizes the detections for each image based on the display/canvas size
export async function setDetectionSize(detections, displaySize) {
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    return resizedDetections
}
