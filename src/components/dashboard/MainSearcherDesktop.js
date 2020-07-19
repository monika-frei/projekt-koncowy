import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterTrips } from '../../store/actions/searchActions'



class MainSearcherDesktop extends Component {

    state = {
        searchTrip: ""
    }

    changeInput = (e) => {
        e.preventDefault();
        const searchTrip = e.target.value.trim().toLowerCase();
        this.setState({
            searchTrip
        })
    }

    handleButton = (e) => {
        e.preventDefault();
        this.props.filterTrips(this.state.searchTrip)
    }



    render() {
        const searcher = 
        <form id="main__searcher--desktop" onSubmit={this.props.search}>
            <input type="text" id="main__searcher__input" placeholder="e.g. Poland" value={this.searchTrip} onChange ={this.changeInput}></input>
            <button id= "main__search" className="search__button" onClick = {this.handleButton}><i className= "icon__search"></i></button>
        </form>;
        return searcher;
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        filterTrips: (value) => dispatch(filterTrips(value))
    }
}


export default connect(mapStateToProps,
    mapDispatchToProps)(MainSearcherDesktop);