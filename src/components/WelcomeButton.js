import React, { Component } from 'react';

class WelcomeButton extends Component {
  render() {
    return (
      <div className = "welcome__button" onClick ={this.props.home}>
          <div className = "welcome__button--inside"></div>
          <div className = "welcome__button--inside"></div>
          <div className = "welcome__button--inside"></div>
          <div className = "welcome__button--inside"></div>
      </div>
    );
  }
}

export default WelcomeButton;