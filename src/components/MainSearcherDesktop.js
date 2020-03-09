import React, { Component } from 'react';

const searcher = <div id="main__searcher--desktop" className="">
<input type="text" id="main__searcher__input" placeholder="Where are you going?"></input>
<button id= "main__search" className="search__button"><i className= "icon__search"></i></button>
</div>;

class MainSearcherDesktop extends Component {

    render() {
        return searcher;
    }
}

export default MainSearcherDesktop;