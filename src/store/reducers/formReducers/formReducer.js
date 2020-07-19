import { combineReducers } from 'redux'
import formStepOneReducer from '../formReducers/formStepOneReducer'
import formStepTwoReducer from './formStepTwoReducer'
import formStepThreeReducer from './formStepThreeReducer'

const formReducer = combineReducers ({
    stepOne: formStepOneReducer,
    stepTwo: formStepTwoReducer,
    stepThree: formStepThreeReducer
})


export default formReducer