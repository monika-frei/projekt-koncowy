import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import MobileMenu from './MobileMenu';
import { connect } from 'react-redux'
import SingnedInLinks from './SingnedInLinks';
import { filterTrips } from '../../store/actions/searchActions'


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            classActive: "",
            classActiveNav: "navigation",
        }
    }

    handleHamburger = (e) => {
        e.preventDefault();
        if (this.state.active) {
            this.setState({
                active: false,
                classActive: "",
                classActiveNav: "navigation"
            })

        } else {
            this.setState({
                active: true,
                classActive: "hamburger--active",
                classActiveNav: "navigation--active"
            })
        }
    }    

    handleCloseMenu = (e) => {
        e.preventDefault();
        this.setState({
            active: false,
            classActive: "",
            classActiveNav: "navigation"
        })
    }

    
    render() {
        const { auth } = this.props
        const links = auth.uid ? <SingnedInLinks classActiveNav = {this.state.classActiveNav} handleMainContent = {this.props.handleMainContent} handleCloseMenu = {this.handleCloseMenu}/> : <SignedOutLinks classActiveNav = {this.state.classActiveNav} handleMainContent = {this.props.handleMainContent} handleCloseMenu = {this.handleCloseMenu}/>
        return (<>
            <div className = {`header--wrapper ${this.props.classInvisible}`}>
                <div className='header'>
                    <div className="logo"><p className= "link--logo" to="/" data-letters= "Adventure" onClick = {this.props.handleMainContent}><Link to='/home' style= {{textDecoration: 'none', color: 'yellow'}}>Adventure</Link></p></div>
                    <MobileMenu handleHamburger = {this.handleHamburger} classActiveNav = {this.state.classActiveNav} classActive = {this.state.classActive} showSearch = {this.props.showSearch} searcherClass = {this.props.searcherClass} handleCloseMenu = {this.handleCloseMenu}/>
                </div>
                { links }
            </div>
        </>)
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        classInvisible: state.classInvisible.classInvisible
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterTrips: (value) => dispatch(filterTrips(value))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Header);