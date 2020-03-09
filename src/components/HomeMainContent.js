import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tripsData from '../data/trips.json';
import axios from 'axios';


class HomeMainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedTrips: []            
        }
    }
        componentDidMount() {
        axios.get('../data/trips.json')
        .then(response => response.json())
        .then(result => console.log(result))
        
        
    }

    render() {
        const tripsList = this.state.savedTrips.map(trip => {
            return (
            <div className="trip__card" key={trip.id}>
                <div className="trip__card__info">
                    <h1 className= "destination">{trip.destination}</h1>
                    <h2 className= "duration">{trip.duration}</h2>
                </div>
                <div className= "trip__card__images"></div>
                <div className= "trip__card__decsription">{trip.info}</div>
                <Link to= {'/' + trip.id}>
                <button className="trip__card__button">More</button>
                </Link>
            </div>
        )})
    return(<div className="main__content">
            {tripsList}
        </div>              
    )}
}

export default HomeMainContent;