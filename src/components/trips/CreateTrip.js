import React, { Component} from 'react';
import { connect } from 'react-redux'
import { createTripInfo, formFiles,formDestination, formStops, formStartDate, formEndDate, formTransport, formInfo } from '../../store/actions/tripActions'
import { Redirect } from 'react-router-dom'
import UploadImages from './UploadImages';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import Summary from './Summary';
import ButtonNext from  './ButtonNext';
import ButtonNextPrev from './ButtonNextPrev';
import ButtonAdd from './ButtonAdd';

class CreateTrip extends Component {

    state = {
        step: 1
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

    handleSubmit = (e) => {
        e.preventDefault();
        const newTrip = {
            destination: this.props.destination,
            stops: this.props.stops,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            transport: this.props.transport,
            info: this.props.info,
        }

        const files = this.props.files;
        if(files) {
            this.props.createTrip(newTrip)
            this.props.history.push('/')
        }
    }

    componentWillUnmount() {
        const destination = "";
        const stops = [];
        const startDate = "";
        const endDate = "";
        const transportArray = [];
        const files = [];
        const filesUrl = [];
        const value = "";



        this.props.formFiles(files,filesUrl);
        this.props.formDestination(destination);
        this.props.formStops(stops);
        this.props.formStartDate(startDate);
        this.props.formEndDate(endDate);
        this.props.formTransport(transportArray);
        this.props.formInfo(value)

        
    }

    render() {

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin'></Redirect>

        let formStep;
        let buttons;
        if(this.state.step == 1) {
            formStep = <FormStepOne destination = {this.props.destination} startDate = {this.props.startDate} endDate = {this.props.endDate} stops = {this.props.stops} transport = {this.props.transport} />
            buttons = <ButtonNext handleNextButton = {this.handleNextButton} />
        } else if(this.state.step == 2) {
            formStep = <FormStepTwo info = {this.props.info} />
            buttons = <ButtonNextPrev handleNextButton = {this.handleNextButton} handlePrevButton = {this.handlePrevButton} />
        } else if(this.state.step == 3) {
            formStep = <UploadImages filesUrl = {this.props.filesUrl} files = {this.props.files} />
            buttons = <ButtonNextPrev handleNextButton = {this.handleNextButton} handlePrevButton = {this.handlePrevButton} />
        } else if(this.state.step == 4) {
            formStep = <Summary destination = {this.props.destination} startDate = {this.props.startDate} endDate = {this.props.endDate} stops = {this.props.stops} transport = {this.props.transport} info = {this.props.info} imagesUrl = {this.props.imagesUrl}  />
            buttons = <ButtonAdd handlePrevButton = {this.handlePrevButton} handleSubmit = {this.handleSubmit}/>
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
        createTrip: (trip) => dispatch(createTripInfo(trip)),
        formFiles: (files, filesUrl) => dispatch(formFiles(files, filesUrl)),
        formDestination: destination => dispatch(formDestination(destination)),
        formStops: stops => dispatch(formStops(stops)),
        formStartDate: (date) => dispatch(formStartDate(date)),
        formEndDate: (date) => dispatch(formEndDate(date)),
        formTransport: transport => dispatch(formTransport(transport)),
        formInfo: info => dispatch(formInfo(info))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateTrip)