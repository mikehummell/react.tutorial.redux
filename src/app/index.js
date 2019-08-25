
import {render} from "react-dom";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger"
import {Provider} from "react-redux";

import App from "./container/App";



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

const userReducer = (state = {
    name: "Max", age: 27
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload
                
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break;
    };
    return state;
};

//Fat Arrow Fuction chain together
const myLogger = (store)=> (next) => (action)=> {
    console.log("Logged Action: ", action);
    next(action); //Does not go to the reducer without the next.
}

//STORE
const store = createStore(combineReducers(
    {matReducer, userReducer}),
    {},
    applyMiddleware( logger)
); 

//SUBSCRIE
store.subscribe(()=> {
    //console.log("Store updated", store.getState());
});

//ACTION
//Send to the store and the store know what to do
// store.dispatch({
//     type: "ADD",
//     payload: 100
// })

// store.dispatch({
//     type: "ADD",
//     payload: 22
// })

// store.dispatch({
//     type: "SUBSTRACT",
//     payload: 80
// })

// store.dispatch({
//     type: "SET_AGE",
//     payload: 30
// })


render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('app')
);