import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'



class TripsList extends Component {

    render() {

        let { trips, filter } = this.props;  
        let filteredTrips = [];
        if (filter !== "") {
            filteredTrips = trips.filter((element) => {
                if(element.stops.includes(filter)){
                  return element
                } else if(element.destination.includes(filter)){
                  return element
                } else return null;
            })
        }        
        
        if(filteredTrips.length !== 0) {
            trips = filteredTrips;
        }
        
        const tripsList = trips && trips.map(trip => {
            return (
            <div className="trip__card" key={trip.id}>
                <div className="trip__card__info">
                    <h1 className= "destination">{trip.destination}</h1>
                    <h2 className= "duration">{trip.duration}</h2>
                </div>
                <img src =  {`data:image/jpg;base64,${trip.src}`} style={{width:'100%', height: '200px'}} className= "trip__images"></img>
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
    return {
        trips: state.firestore.ordered.trips,
        filter: state.filter
    }
}

export default compose(
    firestoreConnect([
        {collection: 'trips'}
    ]),
    connect(mapStateToProps),
)(TripsList);