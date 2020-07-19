const formStepTwoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SAVE_INFO':
        return {
            ...state,
            info: action.info
        };
    default:
        return state;
    }
}

export default formStepTwoReducer