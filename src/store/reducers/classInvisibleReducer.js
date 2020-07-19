const classInvisibleReducer = (state = "", action) => {
    switch (action.type) {
      case 'ADD_CLASS_INVISIBLE':
        return {
            ...state,
            classInvisible: action.invisible
        }
      default:
        return state;
    }
}

export default classInvisibleReducer