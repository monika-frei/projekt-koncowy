import React, { Component } from 'react';


class MainSearcher extends Component {

    render() {
        if(this.props.searchButtonActive){
            return <div id="main__searcher" className={this.props.searcherClass}>
            <input type="text" id="main__searcher__input" placeholder="Where are you going?"></input>
            <button id= "main__search" className="search__button"><i className= "icon__search"></i></button>
            </div>;
        } else {
            return null;
        }
    }
}

export default MainSearcher;