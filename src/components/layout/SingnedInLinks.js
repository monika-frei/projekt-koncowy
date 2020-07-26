import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { filterTrips } from '../../store/actions/searchActions'


class SignedInLinks extends Component {

    handleMainContent = (e) => {
        e.preventDefault();
        this.props.filterTrips("")
        this.props.handleCloseMenu(e)
    }
    
    render(){
        const { profile } = this.props
        return (
            <nav className= {this.props.classActiveNav}>
                <ul>
                    <li onClick={this.handleMainContent}><NavLink to='/home' style= {{textDecoration: 'none', color: '#040505'} }>Home</NavLink></li>
                    <li onClick = {this.props.handleCloseMenu}><NavLink to='/createtrip' style= {{textDecoration: 'none', color: '#040505'}}>Create a new trip</NavLink></li>
                    <li onClick = {this.props.handleCloseMenu}><NavLink to='/userpanel' style= {{textDecoration: 'none', color: '#040505'}}>Saved trips</NavLink></li>
                    <li onClick = {this.props.handleCloseMenu}><a onClick={this.props.signOut}>Log out</a></li>
                    <li className = "navigation__user--logged" onClick = {this.props.handleCloseMenu}>{this.props.profile.firstName}</li>
                </ul>
            </nav>
        )
    }
    
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        filterTrips: value => dispatch(filterTrips(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);