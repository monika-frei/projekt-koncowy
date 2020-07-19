export const formDestination = (destination) => ({
    type: 'SAVE_DESTINATION',
    destination
})

export const formStops = (stops) => ({
    type: 'SAVE_STOPS',
    stops
})

export const formStartDate = (startDate) => ({
    type: 'SAVE_START_DATE',
    startDate
})

export const formEndDate = (endDate) => ({
    type: 'SAVE_END_DATE',
    endDate
})

export const formTransport = (transport) => ({
    type: 'SAVE_TRANSPORT',
    transport
})

export const formInfo = (info) => ({
    type: 'SAVE_INFO',
    info
})

export const formFiles = (files, filesUrl) => ({
    type: 'SAVE_FILES',
    files,
    filesUrl
})

const addTripStarted = () => ({
    type: 'ADD_TRIP_STARTED',
    

})

export const createTripInfo = (trip)  => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const images = getState().formCreateTrip.stepThree.files;
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

export const classInvisible = (invisible) => ({
    type: 'ADD_CLASS_INVISIBLE',
    invisible
})

export const deleteTrip = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('trips').doc(id).delete()
        .then(() => {
            firebase.storage().ref(`images/${authorId}/${id}`).delete()
        })
        .then(() => dispatch({type: 'DELETE_TRIP'}))
        .catch((error) => {
            dispatch({type: 'DELETE_TRIP_ERROR', error})
        }) 
    }
}

export const editTrip = (id) => ({
    type: 'EDIT_USER_TRIP',
    id
})

export const updateTrip = (trip,id)  => {
    return(dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const authorId = getState().firebase.auth.uid;
        const images = getState().formCreateTrip.stepThree.files;
        const files = [...images];

        

        firestore.collection('trips').doc(id).update({
            ...trip,
            createdAt: new Date(),
        })
        .then(() => {
            dispatch(sendFiles(id,files))
        })
        .then(() => dispatch({type: 'UPDATE_TRIP',trip}))
        .catch((error) => {
            dispatch({type: 'UPDATE_TRIP_ERROR', error})
        })    
      
    }
}

