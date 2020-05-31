const tripReducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_TRIP':
        console.log('created trip',action.trip);
        return state;
        
      case 'ADD_TRIP_ERROR':
        console.log('created trip error', action.error);
        return state;
      default:
        return state;
    }
}

export default tripReducer