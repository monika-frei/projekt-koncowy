import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { deleteTrip } from '../../store/actions/tripActions'



class UserPanel extends Component {

    state = {
        edit: false
    }

    handleDeleteButton = (trip) => { 
        const id = trip.id;   
         this.props.deleteTrip(id)
         this.props.history.push('/')
    }

    render() {
            const { auth, trips } = this.props
            if (!auth.uid) return <Redirect to='/'></Redirect>
            const tripsFiltered = trips && trips.filter((trip) => {
                return (trip.authorId === auth.uid ? trip : null)
            })
            let userTrips = tripsFiltered && tripsFiltered.map(trip => {
                    return (
                        <div className="trip" key={trip.id}>
                            <div className="trip__info">
                                <h1 className= "destination">{trip.destination}</h1>
                                <h2 className= "duration">{trip.duration}</h2>
                            </div>
                            <img className= "trip__images" src = {`data:image/jpg;base64,${trip.src}`} style={{width:'100%', height: '200px'}}></img>
                            <div className= "trip__more">
                                <div className= "trip__decsription">{trip.info}</div>
                                    <button className="trip__button" onClick={() => this.handleDeleteButton(trip)}>Delete</button>
                                    {/* <Link to = "/updatetrip"><button className="trip__button" onClick={() => this.props.handleEditButton(trip)}>Edit</button></Link> */}
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
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(UserPanel)