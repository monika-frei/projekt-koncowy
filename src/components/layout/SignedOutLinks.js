import React from 'react';
import { NavLink } from 'react-router-dom'


const SignedOutLinks = (props) => {
    return (
        <nav className= {props.classActiveNav} onClick = {props.handleCloseMenu}>
            <ul>
                <li onClick={props.handleMainContent}><NavLink to='/' style= {{textDecoration: 'none', color:'inherit'}}>Home</NavLink></li>
                <li><NavLink to='/signup' style= {{textDecoration: 'none', color:'inherit'}}>Sign Up</NavLink></li>
                <li><NavLink to='/signin' style= {{textDecoration: 'none', color:'inherit'}}>Log in</NavLink></li>
            </ul>
        </nav>
    )
}

export default SignedOutLinks;