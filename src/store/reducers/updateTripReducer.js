const updateTripReducer = (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_TRIP':
        console.log('created trip',action.trip);
        return state;
        
      case 'UPDATE_TRIP_ERROR':
        console.log('created trip error', action.error);
        return state;
      default:
        return state;
    }
}

export default updateTripReducer