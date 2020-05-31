const formReducer = (state = "", action) => {
    switch (action.type) {
      // case 'SAVE_DESTINATION':
      //   return {
      //       ...state,
      //        destination: action.destination
      // }
      // case 'SAVE_STOPS':
      //   return {
      //       ...state,
      //        stops: action.stops
      // }
      // case 'SAVE_DURATION':
      //     return {
      //         ...state,
      //          duration: action.duration
      // }
      // case 'SAVE_INFO':
      //     return {
      //         ...state,
      //          info: action.info
      // }
      case 'SELECT_FILES':
          return {
              ...state,
               files: action.files
      }
      default:
        return state;
    }
}

export default formReducer