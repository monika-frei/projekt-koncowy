import React from 'react';
import { Link } from 'react-router-dom'

function TripButtons(props) {

    const trip = props.trip;
    
    return (
        <div className = "trip__buttons">
            <button className="trip__button" onClick={() => props.handleDeleteButton(trip)}>Delete</button>
            <button className="trip__button" onClick={() => props.handleEditButton(trip)}>Edit</button>
            <Link to= {'/trip/' + trip.id}>
                <button className="trip__button">More</button>
            </Link>
        </div>
    )
}

export default TripButtons