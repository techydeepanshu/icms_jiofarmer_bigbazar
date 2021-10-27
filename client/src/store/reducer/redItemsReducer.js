const initialState = {
    notFounds: "false",
    unitsInCase: "",
    price: ""
}

const redItemsReducer = (state = initialState, action) => {
    switch(action.type) {
        case "NOT_FOUNDS":
            return {...state, notFounds: action.data}
        case "UNITS_IN_CASE":
            return {...state, unitsInCase: action.data}
        case "PRICE":
            return {...state, price: action.data}
        default: 
            return state;
    }

}

export default redItemsReducer;