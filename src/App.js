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
import UpdateTrip from './components/trips/UpdateTrip';
import { connect } from 'react-redux'
import { filterTrips } from './store/actions/searchActions'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tripId: null,
      dataToEdit: null
    }
}

  handleMainContent = (e) => {
    e.preventDefault();
    this.props.filterTrips("")
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
          <Header handleMainContent = {this.handleMainContent}/>
          <Switch>
            <Route exact path = '/home' render = {(props) => <HomePage {...props} searcherClass = {this.state.searcherClass} searchButtonActive = {this.state.searchButtonActive} backToMain = {this.state.backToMain} />} />
            <Route path = '/trip/:id' component= { Trip }/>
            <Route path = '/signin' component= { SignIn }/>
            <Route path = '/signup' component= { SignUp }/>
            <Route path = '/createtrip' component= { CreateTrip }/>
            <Route path = '/updatetrip' component= { UpdateTrip }/>
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

const mapDispatchToProps = dispatch => {
  return {
      filterTrips: (value) => dispatch(filterTrips(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);