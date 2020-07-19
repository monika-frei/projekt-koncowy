
const editTripReducer = (state = {}, action) => {
    switch (action.type) {
      case 'EDIT_USER_TRIP':
        return {
            ...state,
            id: action.id
        }
        
      case 'EDIT_USER_TRIP_ERROR':
        console.log('edit trip error', action.error);
        return state;
      default:
        return state;
    }
}

export default editTripReducer