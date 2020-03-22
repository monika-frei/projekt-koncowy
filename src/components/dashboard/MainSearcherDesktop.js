import React, { Component } from 'react';



class MainSearcherDesktop extends Component {

    render() {
        const searcher = 
        <form id="main__searcher--desktop" onSubmit={this.props.search}>
            <input type="text" id="main__searcher__input" placeholder="Where are you going?" value={this.props.searchInputValue} onChange ={this.props.changeInput}></input>
            <button id= "main__search" className="search__button"><i className= "icon__search"></i></button>
        </form>;
        return searcher;
    }
}

export default MainSearcherDesktop;