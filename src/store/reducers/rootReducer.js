import authReducer from './authReducer'
import tripReducer from './tripReducer'
import searchReducer from './searchReducer'
import formReducer from '../reducers/formReducers/formReducer'
import classInvisibleReducer from '../reducers/classInvisibleReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import EditTripReducer from './editTripReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    trip: tripReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    filter: searchReducer,
    // destination: formReducer,
    // stops: formReducer,
    // duration: formReducer,
    // info: formReducer,
    formCreateTrip: formReducer,
    editTrip: EditTripReducer,
    classInvisible: classInvisibleReducer
})

export default rootReducer