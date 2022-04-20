const initialState = {
    data: [],
};

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case "getCoins":
            return {
                ...state,
                data: state.data.length > 0 ? [...state.data, ...action.payload] : action.payload,
            };
        default:
            return state;
    }
};