const initialState = {
    userEmail: "",
    todayDate: ""
}

const userDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case "EMAIL":
            return {...state, userEmail: action.data}
        case "TODAY_DATE":
            return {...state, todayDate: action.data}
        default: 
            return state;
    }
}

export default userDetailsReducer;