const deleteTripReducer = (state = {}, action) => {
    switch (action.type) {
      case 'DELETE_TRIP':
        console.log('deleted trip');
        return state;
        
      case 'DELETE_TRIP_ERROR':
        console.log('deleted trip error', action.error);
        return state;
      default:
        return state;
    }
}

export default deleteTripReducer