import React, { Component } from 'react';

class Trip extends Component {

    state = {
        id: null
    }

    componentDidMount() {
        let id = this.props.match.params.id;

        this.setState({
            id: id
        })
    }

    render() {
        return (
            <div className="trip__info">
                <div className = "wrapper">
                    {/* <h1 className = "trip__destination">{trip.destination}</h1>
                    <h2 className= "trip__duration">{trip.duration}</h2>
                    <div className = "images__gallery">{trip.images}</div>
                    <p className= "trip__description">{trip.info}</p>
                    <span className = "trip__author">{trip.author}</span> */}
                </div>
            </div>
        )
    }
}

export default Trip;