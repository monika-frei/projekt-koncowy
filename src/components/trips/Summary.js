import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';

class Summary extends Component {
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
        checked9: ( this.props.transport && this.props.transport.includes('other')) ? true : false,
        info: this.props.info ? this.props.info : "",
        filesUrl: this.props.filesUrl ? [...this.props.filesUrl] : []

    }
    render() {
        let destination = this.props.destination ? this.props.destination : <p>No destination saved!</p>;
        let startDate = this.props.startDate ? this.props.startDate : <p>No start date saved!</p>;
        let endDate = this.props.endDate ? this.props.endDate : <p>No end date saved!</p>;
        let info = this.props.info ? this.props.info : <p>No description added!</p>;
        let stops;
        let transport;
        if (this.props.stops) {
            stops = this.props.stops.map((stop,index) => {
                return (
                    <li key = {index}>{stop}</li>
                )
            })
        } else {
            stops =  <p>No stops added!</p> 
        }
        if(this.props.transport) {
            transport = this.props.transport.map((item,index) => {
                return (
                    <li key = {index}>{item}</li>
                )
            })
        } else {
            transport = <p>No transport chosen!</p>
        }
        const files = this.props.filesUrl ? this.props.filesUrl : [];
        const images = files.map((file, index) => {
            return (
                <li key = {index}>
                    <img src= {file} style = {{width: '300px'}}></img>
                </li>
            )
        })
        
        return (
            <div className = "summary">
                <h2>{destination}</h2>
                <div className = "summary__list">
                    <ul>
                        { stops }
                    </ul>
                </div>
                <div className = "summary__list">
                    <p>{ startDate }</p>
                    <p>{ endDate }</p>
                    <ul className = "summary__list">{ transport }</ul>
                </div>
                <div className = "summary__info">
                    { info }
                </div>
                <ul className= "images__upload__preview ">
                    { images }
                </ul>
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


export default connect(mapStateToProps)(Summary)