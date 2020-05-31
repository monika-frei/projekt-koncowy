import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import MobileMenu from './MobileMenu';
import { connect } from 'react-redux'
import SingnedInLinks from './SingnedInLinks';


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
            this.setState({active: false})
            this.setState({classActive: ""})
            this.setState({classActiveNav: "navigation"})

        } else {
            this.setState({active: true})
            this.setState({classActive: "hamburger--active"})
            this.setState({classActiveNav: "navigation--active"})
        }
    }    

    
    render() {
        const { auth } = this.props
        const links = auth.uid ? <SingnedInLinks classActiveNav = {this.state.classActiveNav} handleMainContent = {this.props.handleMainContent} /> : <SignedOutLinks classActiveNav = {this.state.classActiveNav} handleMainContent = {this.props.handleMainContent}/>
        return (<>
            <div className = "header--wrapper">
                <div className='header'>
                    <div className="logo"><Link className= "link--logo" to="/" data-letters= "Adventure" onClick = {this.props.handleMainContent}>Adventure</Link></div>
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
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Header);