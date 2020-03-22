import React, { Component} from 'react';
import { connect } from 'react-redux'
import { updateTrip } from '../../store/actions/tripActions'
import { Redirect } from 'react-router-dom'

class UpdateTrip extends Component {
    state = {
        destination: '',
        stops: [],
        duration: '',
        images: [],
        info: '',
        stop: ''        
    }

    handleChange = (e) => {
        let value = e.target.value.toLowerCase();
        this.setState({
            [e.target.id] : value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newTrip = {
            destination: this.state.destination,
            stops: this.state.stops,
            duration: this.state.duration,
            info: this.state.info,
        }

        // this.props.createTrip(newTrip)
        // this.props.history.push('/')
    }

    handleStopButton = (e) => {
        e.preventDefault();
        this.setState({
            stops: [...this.state.stops,this.state.stop],
            stop: ''
        })
    }

    handleDeleteStop = (index) => {
        const stops = this.state.stops.filter((stop) => {
            let i = this.state.stops.indexOf(stop);
            return i !== index
        })
        this.setState({
            stops
        })
    }

    componentDidMount() {
        this.setState({
            destination: this.props.dataToEdit.destination,
        stops: this.props.dataToEdit.stops,
        duration: this.props.dataToEdit.duration,
        info: this.props.dataToEdit.info,
        stop: this.props.dataToEdit.stop
        })
    }

    render() {
        console.log(this.state.destination)
        const stopsList = this.state.stops.map( stop => {
            let index = this.state.stops.indexOf(stop);
                return(
                    <li key={index}>
                        <span>{stop}</span>
                        <button className="btn--delete" onClick={() => {this.handleDeleteStop(index)}}>Delete</button>
                    </li>
                )
        })

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin'></Redirect>

        return(

        <div className = "form__container form__container--createtrip">
            <form onSubmit={this.handleSubmit}>
                <h1>Edit a trip</h1>
                <div className = "input__field">
                   <label htmlFor= "destination">Destination:</label>
                   <input type="text" id="destination" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field">
                    <label htmlFor= "stop">Add stop:</label>
                    <input type="text" id="stop" value={this.state.stop} onChange={this.handleChange}/> 
                    <div className="btn--action">
                        <button className="btn" onClick={this.handleStopButton}>Add</button>
                    </div>
                    <ul className = "stops__list">
                        { stopsList }
                    </ul>                    
                </div>
                <div className = "input__field">
                   <label htmlFor= "duration">Duration</label>
                   <input type="text" id="duration" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field">
                   <label htmlFor= "info">Description</label>
                   <textarea type="text" id="info" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field btn--action">
                   <button className = "btn">Save</button>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        trips: state.firestore.ordered.trips
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         createTrip: (trip) => dispatch(updateTrip(trip)),
//     }
// }

export default connect(mapStateToProps)(UpdateTrip)