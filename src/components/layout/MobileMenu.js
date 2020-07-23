import React, { Component } from 'react';

class MobileMenu extends Component {

   render(){
    return(
        <div className= "navigation__buttons">
            <button onClick={this.props.handleHamburger} className = {`hamburger ${this.props.classActive}`}>
            <span  className = "hamburger__box">
                <span className = "hamburger__inner"></span>
            </span>
            </button>
        </div>
    )
}
}

export default MobileMenu;