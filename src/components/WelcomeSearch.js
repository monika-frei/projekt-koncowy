import React, { Component } from 'react';

class WelcomeSearch extends Component {

  render() {
    return (
      <div className = "welcome__searcher">
          <h1>Plan your trip to:</h1>
          <form onSubmit={this.props.home}>
              <input type="text" name= "search" id="welcome__searcher__input" placeholder="e.g. Europe"></input>
          </form>
      </div>
    );
  }
}

export default WelcomeSearch;