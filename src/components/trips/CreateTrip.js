import React, { Component} from 'react';
import { connect } from 'react-redux'
import { createTrip } from '../../store/actions/tripActions'
import { Redirect } from 'react-router-dom'
import ReactFileReader from 'react-file-reader';

class CreateTrip extends Component {

    state = {
        destination: '',
        stops: [],
        duration: '',
        images: [],
        info: '',
        stop: '',
        image: '',
        src: '',
        value: null,
        output: ''
    }

    handleChange = (e) => {
        let value = e.target.value.toLowerCase();
        this.setState({
            [e.target.id] : value
        })
    }

    handleChangeImage = (e) => {
       this.setState({
           image: e.target.value
       })
        let image = e.target.files[0];
        let output = escape(image.name);
        const reader = new FileReader(); 
 
        reader.onload = (e) => {

            let src = window.btoa(e.target.result);
            this.setState({
                src: src,
            })
        }
       reader.readAsBinaryString(image);
       this.setState({
           value: reader
       })       
    }

    handleClickImage = () => {
        let input = this.refs.input__reader;
        input.click();
        console.log(this.state.src)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newTrip = {
            destination: this.state.destination,
            stops: this.state.stops,
            duration: this.state.duration,
            info: this.state.info,
            src: this.state.src
        }

        this.props.createTrip(newTrip)
        this.props.history.push('/')
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

    render() {

        console.log(this.state.src)
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
                <h1>Save Your Trip!</h1>
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
                   <label htmlFor= "images">Image</label>
                   <input type="file" id="images" name= "files[]" value = {this.state.image} onChange={this.handleChangeImage}/>
                   {/* <button onClick={this.handleClickImage} ref="input__reader">Add</button> */}
                </div>
                <div className = "input__field">
                   <label htmlFor= "info">Description</label>
                   <textarea type="text" id="info" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field btn--action">
                   <button className = "btn">Create</button>
                </div>
            </form>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTrip: (trip) => dispatch(createTrip(trip)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateTrip)