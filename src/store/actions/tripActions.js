import { getNodeText } from "@testing-library/react"

export const formDestination = (destination) => ({
    type: 'SAVE_DESTINATION',
    destination
})

export const formStops = (stops) => ({
    type: 'SAVE_STOPS',
    stops
})

export const formDuration = (duration) => ({
    type: 'SAVE_DURATION',
    duration
})

export const selectFiles = (files) => ({
    type: 'SELECT_FILES',
    files
})

export const addTripStarted = () => ({
    type: 'ADD_TRIP_STARTED',

})

export const createTripInfo = (trip)  => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const images = getState().files.files;
        const files = [...images];

        dispatch(addTripStarted());

        firestore.collection('trips').add({
            ...trip,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
        })        
        .then((docRef) => {
            const id = docRef.id;
            dispatch(sendFiles(id,files))
        })
        .then(() => dispatch({type: 'ADD_TRIP',trip}))
        .catch((error) => {
            dispatch({type: 'ADD_TRIP_ERROR', error})
        })
    }
}


export const sendFiles = (id,files) => {
    return(dispatch, getState, { getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;
        let imagesUrl =[];

        dispatch({type:'SEND_FILES_STARTED'})

           files.forEach((file) => {
                const uploadTask = firebase.storage().ref(`images/${authorId}/${id}/${file.name}`)
                .put(file);

                uploadTask.on("state_changed",
                (snapshot) => {
                    Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100);
                },
                error => {
                },
                () => {
                    firebase.storage().ref(`images/${authorId}/${id}`)
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => {
                        imagesUrl= [...imagesUrl,url]
                    })
                    .then(() => {
                        firestore.collection('trips').doc(id)
                        .get()
                        .then(() => {
                        firestore.collection('trips').doc(id).update({imagesUrl})
                        })
                    })
                
                })
            }) 
}}



export const sendTrip = (imagesUrl, id) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const images = imagesUrl;
        const tripId = id;
        
        

        firestore.collection('trips').doc(tripId)
        .get()
        .then(() => {
            firestore.collection('trips').doc(tripId).update({images})
        })
        .then(() => dispatch({type:'SEND_TRIP_IMAGES_SUCCESS'}))
        .catch((error) => dispatch({type:'SEND_TRIP_IMAGES_ERROR',error}))       
    }
}

// export const createTrip = (trip) => {
//      return (dispatch, getState, { getFirebase, getFirestore }) => {

//         const firestore = getFirestore();
//         const firebase = getFirebase();
//         const profile = getState().firebase.profile;
//         const authorId = getState().firebase.auth.uid;
//         const images = getState().files.files
//         const files = [...images]
//         let imagesUrl =[];
        
//         files.forEach((file) => {
//             const uploadTask = firebase.storage().ref(`images/${authorId}/${file.name}`)
//             .put(file);

//             uploadTask.on("state_changed",
//             (snapshot) => {
//                 Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100);
//             },
//             error => {
//             },
//             () => {
//                 firebase.storage().ref(`images/${authorId}`)
//                 .child(file.name)
//                 .getDownloadURL()
//                 .then(url => {
//                     imagesUrl= [...imagesUrl,url]
//                     console.log(imagesUrl)
//                 })
//             })
//         })
//             firestore.collection('trips').add({
//                 ...trip,
//                 imagesUrl: imagesUrl,
//                 authorFirstName: profile.firstName,
//                 authorLastName: profile.lastName,
//                 authorId: authorId,
//                 createdAt: new Date(),
//             })
//             .then(() => {
//                 dispatch({type: 'ADD_TRIP', trip})
//             }).catch((error) => {
//                 dispatch({type: 'ADD_TRIP_ERROR', error})
//             })
//         }
//     }

export const deleteTrip = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        let tripId = id
        console.log(tripId)

        firestore.collection('trips').doc(tripId).delete();
    }
}

// export const createTrip = (destination, stops, duration, images) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {

//        const firestore = getFirestore();
//        const firebase = getFirebase();
//        const profile = getState().firebase.profile;
//        const authorId = getState().firebase.auth.uid;

//            firestore.collection('trips').add({
//                ...trip,
//                authorFirstName: profile.firstName,
//                authorLastName: profile.lastName,
//                authorId: authorId,
//                createdAt: new Date(),
//            })
//            .then(() => {
//                dispatch({type: 'ADD_TRIP', trip})
//            }).catch((error) => {
//                dispatch({type: 'ADD_TRIP_ERROR', error})
//            })
//        }
//    }
    





// export const updateTripImage = (file, fileName) => 
//     async (dispatch, getState, { getFirebase, getFirestore }) => {
//         const firestore = getFirestore();
//         const firebase = getFirebase();
//         const profile = getState().firebase.profile;
//         const authorId = getState().firebase.auth.uid;
//         const tripId = getState().firebase.trip.id;
//         const path = `${tripId}/trip_image`;
//         const options = {
//             name: fileName
//         }
        
//         try {

//             let uploadedFile = await firebase.uploadFile(path, file, null, options);
//             let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
//             let tripDoc = await firestore.get(`trips/${tripId}`);

//             if(!tripDoc.data().imageURL) {
//                 await firebase.updateTrip({
//                     imageURL: downloadURL
//                 })
//             }

//         } catch(error) {
//             console.log(error)
//         }
// }

