import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


class TripsList extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         trips: []
    //     }
    // }

    // componentDidMount() {
    //     axios.get("http://localhost:3000/trips")
    //     .then(response => this.setState({
    //         trips: response.data
    //     }))
    // }

    render() {

        let { trips } = this.props;      
        const filteredTrips = this.props.filteredTrips;
        if(filteredTrips.length !== 0) {
            trips = filteredTrips;
        }
        // } else {
        //     trips = this.state.trips;
        // }
        
        const tripsList = trips && trips.map(trip => {
            return (
            <div className="trip__card" key={trip.id}>
                <div className="trip__card__info">
                    <h1 className= "destination">{trip.destination}</h1>
                    <h2 className= "duration">{trip.duration}</h2>
                    
                </div>
                <div className= "trip__card__images"></div>
                <div className= "trip__card__decsription">{trip.info}</div>
                <Link to= {'/trip/' + trip.id}>
                <button className="trip__card__button">More</button>
                </Link>
            </div>
        )})
    return(<div className="main__content">
            {tripsList}
        </div>              
    )}
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        trips: state.firestore.ordered.trips
    }
}

export default compose(
    firestoreConnect([
        {collection: 'trips'}
    ]),
    connect(mapStateToProps),
)(TripsList);