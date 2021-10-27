const initialState = {
    openInvoice: false,
    inv: "",
    num: "",
    day: ""
}
const openInvoiceReducer = (state = initialState, action) => {
    switch(action.type) {
        case "OPEN_INVOICE":
            return {...state, openInvoice: action.data};
        case "SET_INV":
            return {...state, inv: action.data};
        case "SET_NUM":
            return {...state, num: action.data};
        case "SET_DAY":
            return {...state, day: action.data};
        default:
            return state; 
    }

}

export default openInvoiceReducer;