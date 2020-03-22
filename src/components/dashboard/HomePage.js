import React, { Component } from 'react';
import TripsList from './TripsList';
import MainSearcher from './MainSearcher';
import MainSearcherDesktop from './MainSearcherDesktop';
import axios from 'axios'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import UserPanel from './UserPanel';
import NewSearch from './NewSearch';


class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTrip: '',
      searchInputValue: '',
      filteredTrips: []
    }
}
// componentDidMount(){
//   axios.get('http://localhost:3000/trips')
//   .then(response => this.setState({
//     tripsData: response.data
//   }))
// }


changeInputSearch = (e) => {
  e.preventDefault();
  const searchTrip = e.target.value.trim().toLowerCase();
  this.setState({
    searchTrip: searchTrip,
    searchInputValue: searchTrip,
  })
}

handleSearch = (e) => {
  e.preventDefault();
  let { trips } = this.props; 
  const filteredTrips = trips.filter((element) => {
    if(element.stops.includes(this.state.searchTrip)){
      return element
    } else if(element.destination.includes(this.state.searchTrip)){
      return element
    } else return null;
  })
  this.setState({
    filteredTrips: filteredTrips,
    searchInputValue: '',
  })
  
}

   render() {
    return (
      <div className = "home">
        <MainSearcher searchButtonActive = {this.props.searchButtonActive} searcherClass = {this.props.searcherClass} search = {this.handleSearch} changeInput = {this.changeInputSearch} searchInputValue = {this.state.searchInputValue} /> 
        <MainSearcherDesktop  search = {this.handleSearch} changeInput = {this.changeInputSearch} searchInputValue = {this.state.searchInputValue}/>
        <TripsList filteredTrips = {this.props.backToMain ? [] : this.state.filteredTrips} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
      trips: state.firestore.ordered.trips,
  }
}

export default compose(
  firestoreConnect([
      {collection: 'trips'}
  ]),
  connect(mapStateToProps),
)(HomePage);


