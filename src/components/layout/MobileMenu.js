import React, { Component } from 'react';

const MobileMenu = (props) => {
    return(
        <div className= "navigation__buttons">
            <button className = "search__button" onClick={props.showSearch}><i className={props.searcherClass}></i></button>
            <button onClick={props.handleHamburger} className = {`hamburger ${props.classActive}`}>
            <span  className = "hamburger__box">
                <span className = "hamburger__inner"></span>
            </span>
            </button>
        </div>
    )
}

export default MobileMenu;