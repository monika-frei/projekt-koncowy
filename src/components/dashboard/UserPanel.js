import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { deleteTrip, editTrip, formFiles,formDestination, formStops, formStartDate, formEndDate, formTransport, formInfo } from '../../store/actions/tripActions'



class UserPanel extends Component {

    state = {
        edit: false
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
            const { auth, trips } = this.props
            if (!auth.uid) return <Redirect to='/'></Redirect>
            const tripsFiltered = trips && trips.filter((trip) => {
                return (trip.authorId === auth.uid ? trip : null)
            })
            let userTrips = tripsFiltered && tripsFiltered.map(trip => {
                const shortInfo = trip.info.substring(0,250)
                    return (
                        <div className="trip" key={trip.id}>
                            <img className= "trip__images" src = {trip.imagesUrl[0]}></img>
                            
                            <div className = "user__trip__info">
                                <div className="trip__info">
                                    <h1 className= "destination">{trip.destination}</h1>
                                    <h2 className= "duration">{trip.startDate}</h2>
                                    <h2 className= "duration">{trip.endDate}</h2>
                                </div>
                                <div className= "trip__more">
                                    <div className= "trip__decsription">{shortInfo} [...]</div>
                                    <div className = "trip__buttons">
                                        <button className="trip__button" onClick={() => this.handleDeleteButton(trip)}>Delete</button>
                                        <button className="trip__button" onClick={() => this.handleEditButton(trip)}>Edit</button>
                                        <Link to= {'/trip/' + trip.id}>
                                            <button className="trip__button">More</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            )
    return(
        <div className="panel__container">
            <h1> Your trips </h1>
            <div className="usertrips">
               { userTrips ? userTrips : <h2>No trips saved!</h2> }
            </div>
        </div>              
    )}

}

    const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        trips: state.firestore.ordered.trips
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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




export default connect(mapStateToProps,mapDispatchToProps)(UserPanel)