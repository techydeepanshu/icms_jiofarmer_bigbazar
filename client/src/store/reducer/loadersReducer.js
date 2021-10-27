const initialState = {
    apiLoader: false,
    loader: false
}

const loadersReducer = (state = initialState, action) => {
    switch(action.type){
        case "API_LOADER":
            return {...state, apiLoader: !state.apiLoader};
        case "LOADER":
            return {...state, loader: !state.loader}
        default:
            return state
    }

}

export default loadersReducer;