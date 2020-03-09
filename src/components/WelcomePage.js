import React, { Component } from 'react';
import WelcomeSearch from './WelcomeSearch';
import WelcomeButton from './WelcomeButton';

class WelcomePage extends Component {


  handleHome = (e) => {
    e.preventDefault();
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className = "welcome">
          <WelcomeSearch  home = {this.handleHome}/>
          <WelcomeButton home = {this.handleHome}/>
      </div>
    );
  }
}

export default WelcomePage;