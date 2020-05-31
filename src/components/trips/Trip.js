import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { filterTrips } from '../../store/actions/searchActions'

class Trip extends Component {

    state = {
        src: ''
    }

    handleMainContent = () => {
        const value = ""
        this.props.filterTrips(value)
    }

    render() {
        const { trip } = this.props;
        if(trip) { 
            return (<div className="wrapper">
            <div className = "trip__container">
                    <h1 className = "trip__destination">{trip.destination}</h1>
                    <h2 className= "trip__duration">{trip.duration}</h2>
                    <div className = "trip__stops">
                        <ul className = "stops">
                            {trip.stops.map((stop) => {
                                return <li>{stop}</li>
                            })}
                        </ul>
                    </div>
                    <img src = {`data:image/jpg;base64,${trip.src}`} style={{width:'60%', height: '200px'}} className= "trip__images"></img>
                    <p className= "trip__description">{trip.info}</p>
                    <div className = "trip__created">
                        <span className = "trip__author">{trip.authorFirstName}</span>
                        <p>{moment(trip.createdAt.toDate()).startOf('day').fromNow()}</p>
                    </div>                
                    <button className="trip__btn" onClick = {this.handleMainContent}><Link to = "/">Home</Link></button>
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
    return {
        trip,
        id
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