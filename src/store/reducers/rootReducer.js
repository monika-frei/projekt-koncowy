import authReducer from './authReducer'
import tripReducer from './tripReducer'
import searchReducer from './searchReducer'
import formReducer from '../reducers/formReducers/formReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'


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
    files: formReducer
})

export default rootReducer