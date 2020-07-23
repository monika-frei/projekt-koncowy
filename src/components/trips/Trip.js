import React, { Component, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { filterTrips } from '../../store/actions/searchActions'
import { classInvisible } from '../../store/actions/tripActions'
import { deleteTrip, editTrip, formFiles,formDestination, formStops, formStartDate, formEndDate, formTransport, formInfo } from '../../store/actions/tripActions'
import ImagesGrid from './ImagesGrid'
import { Parallax } from 'react-parallax';

class Trip extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageOpenIndex: null,
            imageOpen: "",
            previewAction: "image__preview--close",
            galleryInvisible: ""
        }
    }

    handleMainContent = () => {
        const value = ""
        this.props.filterTrips(value)
    }

    handleDisplayOriginalImage = (e,index) => {
        const imageOpen = e.target.src
        this.setState({
            imageOpen,
            imageOpenIndex: index,
            previewAction: "image-preview--open",
            invisible: "invisible"
        })      
        this.props.classInvisible("invisible")
    }


    handleCloseOriginalImage = (e) => {
        e.preventDefault();
        this.setState({
            imageOpen: "",
            previewAction: "image__preview--close",
            invisible: ""
        })
        this.props.classInvisible("")
    }

    handlePrevOriginalImage = (e) => {
        e.preventDefault();
        const imagesArray = this.props.trip.imagesUrl
        const arrayLength = imagesArray.length;
        this.setState(prevState => ({
            imageOpenIndex: prevState.imageOpenIndex > 0 ? prevState.imageOpenIndex -1 : arrayLength -1 
        }))
    }

    handleNextOriginalImage = (e) => {
        e.preventDefault();
        const imagesArray = this.props.trip.imagesUrl
        const arrayLength = imagesArray.length;
        this.setState(prevState => ({
            imageOpenIndex: prevState.imageOpenIndex < arrayLength -1 ? prevState.imageOpenIndex +1 : 0
        }))
    }

    handleDeleteButton = (trip) => { 
        const id = trip.id;   
         this.props.deleteTrip(id)
         this.props.history.push('/')
    }
    handleEditButton = (trip) => {
        const id = trip.id;   
        const destination = trip.destination;
        const stops = trip.stops;
        const startDate = trip.startDate;
        const endDate = trip.endDate;
        const transportArray = trip.transport;
        const files = [];
        const filesUrl = trip.imagesUrl;
        const value = trip.info;

        this.props.editTrip(id);
        this.props.formFiles(files,filesUrl);
        this.props.formDestination(destination);
        this.props.formStops(stops);
        this.props.formStartDate(startDate);
        this.props.formEndDate(endDate);
        this.props.formTransport(transportArray);
        this.props.formInfo(value)
        this.props.history.push('/updatetrip')
    }



    render() {
        const { trip } = this.props;
        let userButtons;
        

        if(trip) { 
            const auth = this.props.auth.uid;
            const tripAuthId = trip.authorId;
            console.log(auth, tripAuthId)
            if(auth == tripAuthId) {
                userButtons = <div className = "user__buttons">
                <button className="trip__button" onClick={() => this.handleDeleteButton(trip)}>Delete</button>
                <button className="trip__button" onClick={() => this.handleEditButton(trip)}>Edit</button>
            </div>
            } else {userButtons = null}

            const imagesUrl = trip.imagesUrl;

            return (<div className="wrapper">
                <div className = {this.state.classInvisible}>
                    <Parallax bgImage = {imagesUrl[0]} strength = {800}>
                            <div></div>
                    </Parallax>
                </div>
                <div className = {`trip__wrapper ${this.state.invisible}`}>
                    <article>
                            <div className = "trip__container">
                                { userButtons }
                                <h1 className = "trip__destination">{trip.destination}</h1>
                                <h2 className= "trip__duration">{trip.startDate}</h2>
                                <h2 className= "trip__duration">{trip.endDate}</h2>
                                <section className = "trip__basic__info--wrapper">
                                    <div className = "trip__basic__info">
                                        <ul className = "trip__basic__info__list">
                                            {trip.stops.map((stop) => {
                                                return <li>{stop}</li>
                                            })}
                                        </ul>
                                        <ul className = "trip__basic__info__transport">
                                        {trip.transport.map((element) => {
                                            return <li className = {`transport__icon ${element} `}></li>
                                        })}
                                        </ul>
                                    </div>
                                </section>
                                <section className= "trip__description">{trip.info}</section>
                                <div className = "trip__created">
                                    <span className = "trip__author">by {trip.authorFirstName}</span>
                                    <p>{moment(trip.createdAt.toDate()).startOf('day').fromNow()}</p>
                                </div>
                            </div>
                        </article>
                        <div className = "trip__container">
                            <ImagesGrid  images = {imagesUrl} handleDisplayOriginalImage = {this.handleDisplayOriginalImage} />
                        </div>
                            
                    </div>
                    <div className = {`image__preview ${this.state.previewAction}`}>
                        <img src = {imagesUrl[this.state.imageOpenIndex]}></img>
                        <div className = "slider__buttons">
                            <button className="btn btn--prev" onClick = {this.handlePrevOriginalImage}></button>
                            <button className="btn btn--close" onClick = {this.handleCloseOriginalImage}></button>
                            <button className="btn btn--next" onClick = {this.handleNextOriginalImage}></button>
                        </div>
                    </div>
                </div>)
            } else {
            return (<p>Loading trip...</p>)}
    }
}

const mapStateToProps = (state, ownProps) => {
    const  id = ownProps.match.params.id;
    const  trips  = state.firestore.data.trips;
    const trip = trips ? trips[id] : null;
    const classInvisible = state.classInvisible.classInvisible;
    return {
        trip,
        id,
        classInvisible,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterTrips: value => dispatch(filterTrips(value)),
        classInvisible: value => dispatch(classInvisible(value)),
        deleteTrip: (id) => dispatch(deleteTrip(id)),
        editTrip: (id) => dispatch(editTrip(id)),
        formFiles: (files, filesUrl) => dispatch(formFiles(files, filesUrl)),
        formDestination: destination => dispatch(formDestination(destination)),
        formStops: stops => dispatch(formStops(stops)),
        formStartDate: (date) => dispatch(formStartDate(date)),
        formEndDate: (date) => dispatch(formEndDate(date)),
        formTransport: transport => dispatch(formTransport(transport)),
        formInfo: info => dispatch(formInfo(info))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'trips'}
    ])
)(Trip)