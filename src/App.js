import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Header from './components/layout/Header';
import HomePage from './components/dashboard/HomePage';
import Trip from './components/trips/Trip';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateTrip from './components/trips/CreateTrip';
import UserPanel from './components/dashboard/UserPanel';
import UploadTripImage from './components/trips/UploadTripImage';
import UpdateTrip from './components/trips/UpdateTrip';
import { connect } from 'react-redux'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searcherClass: "",
      searchButtonActive: false,
      iconSearchClass: "icon__search",
      backToMain: false,
      tripId: null,
      dataToEdit: null
    }
}

  handleShowSearch = (e) => {
    e.preventDefault();    
    if(this.state.searchButtonActive) {
      this.setState({searcherClass: "main__searcher--active", searchButtonActive: false, iconSearchClass: "icon__search"})
    } else {
      this.setState({searcherClass: "", searchButtonActive: true, iconSearchClass: "icon__search--active"})
    }
  }

  handleMainContent = (e) => {
    e.preventDefault();
    this.setState({backToMain: true})
    
  }

  handleEditButton = (trip) => {
    const tripId = trip.id;
    const trips = this.props.trips;

    const tripToEdit = trips.filter((trip) => {
      return trip.id === tripId;
    })
    const tripEdit = tripToEdit[0];

    const dataToEdit = {
      destination: tripEdit.destination,
      stops: tripEdit.stops,
      duration: tripEdit.duration,
      info: tripEdit.info
    }
    console.log(dataToEdit)
    this.setState({
      dataToEdit
    })
    
}
  
  render() {
    return (
      <BrowserRouter>
        <div className = "App">
          <Header showSearch = {this.handleShowSearch} searcherClass = {this.state.iconSearchClass} handleMainContent = {this.handleMainContent}/>
          <Switch>
            <Route exact path = '/' render = {(props) => <HomePage {...props} searcherClass = {this.state.searcherClass} searchButtonActive = {this.state.searchButtonActive} backToMain = {this.state.backToMain} />} />
            <Route path = '/trip/:id' component= { Trip }/>
            <Route path = '/signin' component= { SignIn }/>
            <Route path = '/signup' component= { SignUp }/>
            <Route path = '/createtrip' component= { CreateTrip }/>
            <Route path = '/userpanel' render= { (props) => <UserPanel {...props} handleEditButton = {this.handleEditButton} /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      trips: state.firestore.ordered.trips
  }
}

export default connect(mapStateToProps)(App);