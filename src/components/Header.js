import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'


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
        return (<>
            <div className = "header--wrapper">
                <div className='header'>
                <div className="logo"><Link className= "link--logo" to="/home" data-letters= "Adventure">Adventure</Link></div>
                    <div className= "navigation__buttons">
                    <button className = "search__button" onClick={this.props.showSearch}><i className={this.props.searcherClass}></i></button>
                    <button className = {`hamburger ${this.state.classActive}`} onClick={this.handleHamburger}>
                        <span  className = "hamburger__box">
                        <span className = "hamburger__inner"></span>
                        </span>
                    </button>
                    </div>
                </div>
                <nav className= {this.state.classActiveNav}>
                    <ul>
                        <li><NavLink to='/home' style= {{textDecoration: 'none', color:'inherit'}}>About</NavLink></li>
                        <li><NavLink to='/home' style= {{textDecoration: 'none', color:'inherit'}}>Log in</NavLink></li>
                        <li><NavLink to='/home' style= {{textDecoration: 'none', color:'inherit'}}>Contact</NavLink></li>
                    </ul>
                </nav>
            </div>
        </>)
    }
}

export default Header;