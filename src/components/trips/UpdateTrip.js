import React, { Component} from 'react';
import { connect } from 'react-redux'
import { sendFiles, createTripInfo } from '../../store/actions/tripActions'
import { Redirect, useLocation } from 'react-router-dom'
import UploadImages from './UploadImages';
import { format } from 'date-fns'
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import Summary from './Summary';
import ButtonNext from  './ButtonNext';
import ButtonNextPrev from './ButtonNextPrev';
import ButtonUpdate from './ButtonUpdate';
import { editTrip, updateTrip } from '../../store/actions/tripActions'

class UpdateTrip extends Component {

    state = {
        step: 1,
    }

    handleNextButton = (e) => {
        e.preventDefault()
        this.setState({
            step: this.state.step + 1
        })
    }
    handlePrevButton = (e) => {
        e.preventDefault()
        this.setState({
            step: this.state.step - 1
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const newTrip = {
            destination: this.props.destination,
            stops: this.props.stops,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            transport: this.props.transport,
            info: this.props.info,
        }
        const id = this.props.id

        const files = this.props.files;
        if(files) {
            this.props.updateTrip(newTrip,id)
            this.props.history.push('/home')
        }
    }

    componentWillUnmount() {
        const id = ""; 
        const trip = {}  
        this.props.editTrip(trip, id)
    }

    render() {

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin'></Redirect>
        
        let formStep;
        let buttons;
        if(this.state.step == 1) {
            formStep = <FormStepOne location = {this.props.location.pathname} destination = {this.props.destination} startDate = {this.props.startDate} endDate = {this.props.endDate} stops = {this.props.stops} transport = {this.props.transport} />
            buttons = <ButtonNext handleNextButton = {this.handleNextButton} />
        } else if(this.state.step == 2) {
            formStep = <FormStepTwo info = {this.props.info} />
            buttons = <ButtonNextPrev handleNextButton = {this.handleNextButton} handlePrevButton = {this.handlePrevButton} />
        } else if(this.state.step == 3) {
            formStep = <UploadImages filesUrl = {this.props.filesUrl} />
            buttons = <ButtonNextPrev handleNextButton = {this.handleNextButton} handlePrevButton = {this.handlePrevButton} />
        } else if(this.state.step == 4) {
            formStep = <Summary />
            buttons = <ButtonUpdate handlePrevButton = {this.handlePrevButton} handleUpdate = {this.handleUpdate}/>
        }
        

        return(
            
        <div className = "form__container form__container--createtrip">
            <form onSubmit = {this.handleSubmit}>
                <h1>Save Your Trip!</h1>
                { formStep }
                { buttons }
            </form>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        id: state.editTrip.id,
        files: state.formCreateTrip.stepThree.files,
        filesUrl: state.formCreateTrip.stepThree.filesUrl,
        destination: state.formCreateTrip.stepOne.destination,
        stops: state.formCreateTrip.stepOne.stops,
        startDate: state.formCreateTrip.stepOne.startDate,
        endDate: state.formCreateTrip.stepOne.endDate,
        transport: state.formCreateTrip.stepOne.transport,
        info: state.formCreateTrip.stepTwo.info

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTrip: (trip,id) => dispatch(editTrip(trip,id)),
        updateTrip: (trip,id) => dispatch(updateTrip(trip,id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateTrip)