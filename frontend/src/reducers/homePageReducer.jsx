const homePageReducer = (state, action) => {
    switch (action.type) {
        case "GET_REQUEST":
            return {...state, error: '', loading: true};
        case "GET_SUCCESS":
            return {...state, products: action.payload , loading: false};
        case "GET_FAILURE":
            return {...state, error: action.payload , loading: false};
        default:
            return state;
    }
}

export default homePageReducer;