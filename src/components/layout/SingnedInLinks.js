import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { filterTrips } from '../../store/actions/searchActions'


class SignedInLinks extends Component {

    handleMainContent = () => {
        const value = ""
        this.props.filterTrips(value)
    }
    
    render(){
        const { profile } = this.props
        return (
            <nav className= {this.props.classActiveNav}>
                <ul>
                    <li onClick={this.handleMainContent}><NavLink to='/' style= {{textDecoration: 'none', color:'inherit'} }>Home</NavLink></li>
                    <li><NavLink to='/createtrip' style= {{textDecoration: 'none', color:'inherit'}}>Create a new trip</NavLink></li>
                    <li><NavLink to='/userpanel' style= {{textDecoration: 'none', color:'inherit'}}>Saved trips</NavLink></li>
                    <li><a onClick={this.props.signOut}>Log out</a></li>
                    <li className = "navigation__user--logged">{this.props.profile.firstName}</li>
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