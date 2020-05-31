function searchReducer (state = '', action) {
    switch(action.type) {
        case 'FILTER_TRIPS':
            return action.value
        default:
            return state
    }
}

export default searchReducer