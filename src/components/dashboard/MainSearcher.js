import React, { Component } from 'react';


class MainSearcher extends Component {

    render() {
        if(this.props.searchButtonActive){
            return <form id="main__searcher" className={this.props.searcherClass} onSubmit={this.props.search}>
            <input type="text" id="main__searcher__input" placeholder="Where are you going?" value={this.props.searchInputValue} onChange ={this.props.changeInput}></input>
            <button id= "main__search" className="search__button"><i className= "icon__search"></i></button>
            </form>;
        } else {
            return null;
        }
    }
}

export default MainSearcher;