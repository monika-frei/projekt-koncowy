import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'


const SignedInLinks = (props) => {

    const { profile } = props
    
    return (
        <nav className= {props.classActiveNav}>
            <ul>
                <li onClick={props.handleMainContent}><NavLink to='/' style= {{textDecoration: 'none', color:'inherit'} }>Home</NavLink></li>
                <li><NavLink to='/createtrip' style= {{textDecoration: 'none', color:'inherit'}}>Create a new trip</NavLink></li>
                <li><NavLink to='/userpanel' style= {{textDecoration: 'none', color:'inherit'}}>Saved trips</NavLink></li>
                <li><a onClick={props.signOut}>Log out</a></li>
                <li className = "navigation__user--logged">{props.profile.firstName}</li>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);