const initialState = {
    item: "",
    quantity: "",
    description: "",
    price: "",
    pos: "",
    barcode: "",
    posSku: "",
    invoice: "",
    size: "",
    department: "",
    unitCost: "",
    unitPrice: "",
}

const posStateReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_POS_STATE":
            return action.data;
        default: 
            return state;
    }

}

export default posStateReducer;