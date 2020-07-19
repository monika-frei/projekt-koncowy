import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment';



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
            
            const startDate = trip.startDate.split("");
            const endDate = trip.endDate.split("");

            const sDateYear = parseInt((startDate.slice(0,4).join("")),10)
            const eDateYear = parseInt((endDate.slice(0,4).join("")),10)

            const sDateMonth = parseInt((startDate.slice(5,7).join("")),10)
            const eDateMonth = parseInt((endDate.slice(5,7).join("")),10)

            const sDateDay = parseInt((startDate.slice(8,10).join("")),10)
            const eDateDay = parseInt((endDate.slice(8,10).join("")),10)

            let startDateArray = new Array(sDateYear,sDateMonth,sDateDay);
            let endDateArray = new Array(eDateYear,eDateMonth,eDateDay);

            const duration = moment(endDateArray).diff((moment(startDateArray)), 'days')
            
            return (
            <div className="trip__card" key={trip.id}>
                <div className="trip__card__info">
                    <h1 className= "destination">{trip.destination}</h1>
                    <h1 className= "duration">{duration} days</h1>
                </div>
                <div className = "trip__card__container">
                    <img src =  {trip.imagesUrl ? trip.imagesUrl[0] : ""} className= "trip__card__images"></img>
                    <Link to= {'/trip/' + trip.id}>
                    <button className="trip__card__button">More</button>
                    </Link>
                </div>
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