import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { filterTrips } from '../../store/actions/searchActions'


class SignedOutLinks extends Component {

    handleMainContent = (e) => {
        e.preventDefault();
        this.props.filterTrips("")
        this.props.handleCloseMenu(e)
      }

    render() {
        return (
            <nav className= {this.props.classActiveNav}>
                <ul>
                    <li onClick={this.handleMainContent}><NavLink to='/' style= {{textDecoration: 'none', color: '#040505'}}>Home</NavLink></li>
                    <li onClick = {this.props.handleCloseMenu}><NavLink to='/signup' style= {{textDecoration: 'none',color: '#040505'}}>Sign Up</NavLink></li>
                    <li onClick = {this.props.handleCloseMenu}><NavLink to='/signin' style= {{textDecoration: 'none', color: '#040505'}}>Log in</NavLink></li>
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