import React, { Component, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { filterTrips } from '../../store/actions/searchActions'
import ImagesGrid from './ImagesGrid'
import { Parallax } from 'react-parallax';

class Trip extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef() 
        this.state = {
            src: '',
            numberOfImage:0
        }
    }

    handleMainContent = () => {
        const value = ""
        this.props.filterTrips(value)
    }

    handleNext = () => {
        const imagesUrl = this.props.trip.imagesUrl;
        const numberOfImage = this.state.numberOfImage;
        if (numberOfImage < imagesUrl.length - 1 && numberOfImage >= 0) {
            let nextNumber = numberOfImage + 1;
            this.setState({numberOfImage: nextNumber})
        } else {
            let nextNumber = 0;
            this.setState({numberOfImage: nextNumber})
        } 
        
    }
    handlePrev = () => {
        const imagesUrl = this.props.trip.imagesUrl;
        const numberOfImage = this.state.numberOfImage;
        if (numberOfImage > 0) {
            let nextNumber = numberOfImage - 1;
            this.setState({numberOfImage: nextNumber})
        } else {
            let nextNumber = imagesUrl.length - 1;
            this.setState({numberOfImage: nextNumber})
        } 
    }

    scrollToGallery = () => {
        window.scrollTo(0, this.myRef.current.offsetTop)
    }

    render() {
        const { trip } = this.props;
        
        let images;
        if (trip) {
            const imagesUrl = trip.imagesUrl
            console.log(imagesUrl)
            images = <img src={imagesUrl[this.state.numberOfImage]} style={{width: "700px"}}></img>
        }
        if(trip) { 
            const imagesUrl = trip.imagesUrl
            return (<div className="wrapper">
                <div className = {this.props.classInvisible}>
                    <Parallax bgImage = {imagesUrl[0]} strength = {800}>
                            <div style = {{height: 600}}></div>
                    </Parallax>
                </div>
                <div className = "trip__wrapper">
                    <article className = {this.props.classInvisible}>
                            <div className = "trip__container">
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
                        <div className = "trip__container" ref={this.myRef} >
                            <ImagesGrid  images = {imagesUrl} scrollToGallery = {this.scrollToGallery}/>
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
        classInvisible
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterTrips: value => dispatch(filterTrips(value))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'trips'}
    ])
)(Trip)