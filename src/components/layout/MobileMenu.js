import React, { Component } from 'react';

class MobileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searcherClass: "",
            searchButtonActive: false,
            iconSearchClass: "icon__search" 
        }
    }

    showSearch = (e) => {
        e.preventDefault();    
        if(this.state.searchButtonActive) {
          this.setState({searcherClass: "main__searcher--active", searchButtonActive: false, iconSearchClass: "icon__search"})
        } else {
          this.setState({searcherClass: "", searchButtonActive: true, iconSearchClass: "icon__search--active"})
        }
      }

    render(){
    return(
        <div className= "navigation__buttons">
            <button className = "search__button" onClick={this.showSearch}><i className={this.state.searcherClass}></i></button>
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