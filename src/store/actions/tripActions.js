// export const createTrip = (trip) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {

//         const firestore = getFirestore();
//         const firebase = getFirebase();
//         const profile = getState().firebase.profile;
//         const authorId = getState().firebase.auth.uid;

//         firestore.collection('trips').add({
//             ...trip,
//             authorFirstName: profile.firstName,
//             authorLastName: profile.lastName,
//             authorId: authorId,
//             createdAt: new Date()
//         })
//         .then(() => {
//             dispatch({type: 'ADD_TRIP', trip})
//         }).catch((error) => {
//             dispatch({type: 'ADD_TRIP_ERROR', error})
//         })
//     }
// }

export const createTrip = (trip) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
 
            firestore.collection('trips').add({
                ...trip,
                authorFirstName: profile.firstName,
                authorLastName: profile.lastName,
                authorId: authorId,
                createdAt: new Date(),
            })
            .then(() => {
                dispatch({type: 'ADD_TRIP', trip})
            }).catch((error) => {
                dispatch({type: 'ADD_TRIP_ERROR', error})
            })
        }
    }

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

