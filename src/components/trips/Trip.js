import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'

class Trip extends Component {

    state = {
        src: ''
    }

//     componentDidMount() {
//         let id = this.props.match.params.id;
//         axios.get('http://localhost:3000/trips/' + id)
//         .then(response => this.setState({trip: response.data}))
//    }
    handleHomeButton = (e) => {
        e.preventDefault();
        
    }

    // componentDidMount() {
    //     this.setState({
    //         src: this.props.src
    //     })
    // }

    render() {
        const { trip } = this.props;
        console.log(trip.src)
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
                    <p className= "trip__description">{trip.info}</p>
                    <img src = {`data:image/jpg;base64,${trip.src}`} style={{width:'100px', height: '100px'}}></img>
                    <div className = "trip__created">
                    <span className = "trip__author">{trip.authorFirstName}</span>
                    <p>{moment(trip.createdAt.toDate()).startOf('day').fromNow()}</p>
                    </div>
                </div>
                <Link to = "/"><button className="trip__btn">Home</button></Link>
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
        trip
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'trips'}
    ])
)(Trip)