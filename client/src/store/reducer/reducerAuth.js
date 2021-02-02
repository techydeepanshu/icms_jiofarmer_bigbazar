import * as actionTypes from '../action/actionAuth'

const initialState = {
    // token: null,
    userId: null,
    // error: null,
    // loading: false
}

const reducerAuth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            return {
                ...state,
                userId: action.userDetails
            }
        case actionTypes.FETCH_USER:
            return {
                ...state,
                userId: action.userDetails
            }
        default:
            return state
    }
}

export default reducerAuth;