const formStepThreeReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SAVE_FILES':
        return {
            ...state,
            files: action.files,
            filesUrl: action.filesUrl
        };
    case 'DELETE_FILE':
        return {
            ...state,
            files:action.files
        }
    default:
        return state;
    }
}

export default formStepThreeReducer
