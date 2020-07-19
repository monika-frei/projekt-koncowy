import React, { Component} from 'react';
import moment, { isMoment } from 'moment';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { formDestination, formStops, formStartDate, formEndDate, formTransport, editTrip } from '../../store/actions/tripActions'

class FormStepOne extends  Component {

    state = {
        destination: this.props.destination ? this.props.destination : "",
        stop: "",
        stops: this.props.stops ? [...this.props.stops] : [],
        startDate: this.props.startDate ? this.props.startDate : moment().format('YYYY-MM-DD'),
        endDate: this.props.endDate ? this.props.endDate : moment().format('YYYY-MM-DD'),
        focusedInput: null,
        transportArray: this.props.transport ? [...this.props.transport] : [],
        checked1: ( this.props.transport && this.props.transport.includes('bus')) ? true : false,
        checked2: ( this.props.transport && this.props.transport.includes('car')) ? true : false,
        checked3: ( this.props.transport && this.props.transport.includes('airplane')) ? true : false,
        checked4: ( this.props.transport && this.props.transport.includes('train')) ? true : false,
        checked5: ( this.props.transport && this.props.transport.includes('ship')) ? true : false,
        checked6: ( this.props.transport && this.props.transport.includes('hitchhiking')) ? true : false,
        checked7: ( this.props.transport && this.props.transport.includes('bike')) ? true : false,
        checked8: ( this.props.transport && this.props.transport.includes('onfoot')) ? true : false,
        checked9: ( this.props.transport && this.props.transport.includes('other')) ? true : false
    }

    handleSaveDestination =(e) => {
        const destination = e.target.value.toLowerCase();
        this.setState({destination})
        this.props.formDestination(destination)
        const location = this.props.location
        if (location == "/updatetrip") {
            this.setState({destination})
        }
    }

    handleSaveStop = (e) => {
        const stop = e.target.value.toLowerCase();
        this.setState({
            stop
        })
    }

    handleStopButton = (e) => {
        e.preventDefault();
        const stops = [...this.state.stops, this.state.stop]
        this.setState({
            stops: [...this.state.stops,this.state.stop],
            stop: ''
        })
        this.props.formStops(stops)
    }

    handleDeleteStop = (e,index) => {
        e.preventDefault();
        const stops = this.state.stops.filter((stop) => {
            let i = this.state.stops.indexOf(stop);
            return i !== index
        })
        this.setState({
            stops
        })
        this.props.formStops(stops)
    }

    handleSaveStartDate = (e) => {
        const startDate = moment(e.target.value).format('YYYY-MM-DD');
        this.setState({ startDate })

        this.props.formStartDate(startDate)
   }

   handleSaveEndDate = (e) => {
    const endDate = moment(e.target.value).format('YYYY-MM-DD');
    this.setState({ endDate })

    this.props.formEndDate(endDate)
}

    handleSaveTransport = (e) => {
        const target = e.target;
        const checked = target.checked;
        const value = target.value;
        const name = target.name;
        let transportArray = [...this.state.transportArray];
        if(checked === true && transportArray.indexOf(value) === -1) {
            const newItem = value; 
            transportArray = [...transportArray, newItem]
            this.setState({
                transportArray,
                [`checked${name}`]: true
                
            })
        } else if (checked === false && transportArray.indexOf(value) !== -1) {
            transportArray = transportArray.filter(element => element !== value)
            this.setState({
                transportArray,
                [`checked${name}`]: false              
            })
        } else {
            this.setState({
                [`checked${name}`]: false              
            })
        }
        this.props.formTransport(transportArray);        
    }

    
    render(){
        const stopsList = this.state.stops.map( stop => {
            let index = this.state.stops.indexOf(stop);
                return(
                    <li key={index}>
                        <p>{stop}</p>
                        <button className="btn--delete" onClick={(e) => this.handleDeleteStop(e,index)}></button>
                    </li>
                )
            })

        return (
            <>
                <div className = "form__input__wrapper">
                    <div className = "input__field">
                        <label htmlFor= "destination">Where have you been?</label>
                        <input type="text" id="destination" onChange={this.handleSaveDestination} value = {this.state.destination} autoComplete= "off"/> 
                    </div>
                    <div className = "input__field">
                        <label htmlFor= "stop">Add visited places:</label>
                        <input type="text" id="stop" value={this.state.stop} onChange={this.handleSaveStop}/> 
                        <button className="btn" onClick={this.handleStopButton}>Add</button>
                        <ul className = "stops__list">
                            { stopsList }
                        </ul>                    
                    </div>
                </div>
                <div className ="form__input__wrapper">
                    <div className = "input__field date__picker">
                        <label htmlFor = "startDate">Start date:</label>
                        <input id = "startDate" type = "date" value = {this.state.startDate} onChange = {this.handleSaveStartDate}></input>
                        <label htmlFor = "endDate">End date:</label>
                        <input id = "endDate" type = "date" min = {this.state.startDate} value = {this.state.endDate} onChange = {this.handleSaveEndDate}></input>
                    </div>
                </div>
                <div className = "transport">
                    <p>Choose your transport:</p>
                        <input type="checkbox" id = "bus" value = "bus" name= "1" checked = {this.state.checked1} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="bus">Bus</label>
                        <input type="checkbox" id = "car" value = "car" name= "2" checked = {this.state.checked2} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="car">Car</label>
                        <input type="checkbox" id = "airplane" value = "airplane" name= "3" checked = {this.state.checked3} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="airplane">Airplane</label>
                        <input type="checkbox" id = "train" value = "train" name= "4" checked = {this.state.checked4} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="train">Train</label>
                        <input type="checkbox" id = "ship" value = "ship" name= "5" checked = {this.state.checked5} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="ship">Ship</label>
                        <input type="checkbox" id = "hitchhiking" value = "hitchhiking" name= "6" checked = {this.state.checked6} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="hitchhiking">Hitchhiking</label>
                        <input type="checkbox" id = "bike" value = "bike" name= "7" checked = {this.state.checked7} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="bike">Bike</label>
                        <input type="checkbox" id = "onfoot" value = "onfoot" name= "8" checked = {this.state.checked8} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="onfoot">On foot</label>
                        <input type="checkbox" id = "other" value = "other" name= "9" checked = {this.state.checked9} onChange={this.handleSaveTransport}></input>
                        <label htmlFor="other">Other</label>
                </div> 
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        formDestination: destination => dispatch(formDestination(destination)),
        formStops: stops => dispatch(formStops(stops)),
        formStartDate: (date) => dispatch(formStartDate(date)),
        formEndDate: (date) => dispatch(formEndDate(date)),
        formTransport: transport => dispatch(formTransport(transport)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStepOne)