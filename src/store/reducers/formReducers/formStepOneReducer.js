const formStepOneReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SAVE_DESTINATION':
        return {
            ...state,
            destination: action.destination
        };
    case 'SAVE_STOPS':
        return {
            ...state,
        stops: action.stops
        };
    case 'SAVE_START_DATE':
        return {
            ...state,
            startDate: action.startDate
        }
    case 'SAVE_END_DATE':
        return {
            ...state,
            endDate: action.endDate
        }
    case 'SAVE_TRANSPORT':
        return {
            ...state,
            transport: action.transport
        }
    default:
        return state;
    }
}

export default formStepOneReducer

