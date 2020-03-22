
const initState = {
    "trips": [
      {
        "id": 1,
        "destination": "Poland",
        "stops": ["Warszawa", "Kraków","Gdańsk"],
        "duration": "2 weeks",
        "images": [],
        "info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis tellus posuere ipsum placerat pharetra a ut leo. Maecenas facilisis sodales hendrerit.",
        "author": "Beata"
      }]
    }



const tripReducer = (state = initState, action) => {
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