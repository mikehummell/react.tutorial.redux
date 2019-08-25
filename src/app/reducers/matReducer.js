const matReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                //Override
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };

            
            break;
        case "SUBSTRACT":
                state = {
                    ...state,
                    result: state.result - action.payload,
                    lastValues: [...state.lastValues, action.payload]
                };
            break;
    };
    return state;
};

export default matReducer;