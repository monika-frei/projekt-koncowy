import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import MainSearcher from './components/MainSearcher';
import MainSearcherDesktop from './components/MainSearcherDesktop';
import HomePage from './components/HomePage'
import Trip from './components/Trip'

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        searcherClass: "",
        searchButtonActive: false,
        iconSearchClass: "icon__search"
      }
  }

  handleShowSearch = (e) => {
    e.preventDefault();    
    if(this.state.searchButtonActive) {
      this.setState({searcherClass: "main__searcher--active", searchButtonActive: false, iconSearchClass: "icon__search"})
    } else {
      this.setState({searcherClass: "", searchButtonActive: true, iconSearchClass: "icon__search--active"})
    }
    console.log(this.state.searchButtonActive, this.state.searcherClass, this.state.iconSearchClass)
  }

  render() {
    return (
      <BrowserRouter>
        <div className = "App">
          <Header showSearch = {this.handleShowSearch} searcherClass = {this.state.iconSearchClass}/>
          <MainSearcher searchButtonActive = {this.state.searchButtonActive} searcherClass = {this.state.searcherClass}/>
          <MainSearcherDesktop />
          <Switch>
            <Route exact path = '/' component= { HomePage }/>
            <Route path = '/:id' component= { Trip }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
