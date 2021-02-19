import * as actionTypes from "../action/actionAuth";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducerAuth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                token: null,
                userId: null,
                error: null,
                loading: false
            }
        default:
            return state
    }
}

export default reducerAuth;