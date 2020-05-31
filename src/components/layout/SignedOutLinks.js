import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { filterTrips } from '../../store/actions/searchActions'


class SignedOutLinks extends Component {

    handleMainContent = () => {
        const value = ""
        this.props.filterTrips(value)
    }

    render() {
        return (
            <nav className= {this.props.classActiveNav} onClick = {this.props.handleCloseMenu}>
                <ul>
                    <li onClick={this.handleMainContent}><NavLink to='/' style= {{textDecoration: 'none', color:'inherit'}}>Home</NavLink></li>
                    <li><NavLink to='/signup' style= {{textDecoration: 'none', color:'inherit'}}>Sign Up</NavLink></li>
                    <li><NavLink to='/signin' style= {{textDecoration: 'none', color:'inherit'}}>Log in</NavLink></li>
                </ul>
            </nav>
        )
    }    
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        filterTrips: value => dispatch(filterTrips(value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignedOutLinks);