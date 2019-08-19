// import React from "react";
// import {render} from "react-dom";

// import { User } from './components/User';
// import { Main } from './components/Main';

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             username: "Max"
//         };
//     }

//     changeUsername(newName) {
//         this.setState({
//             username: newName
//         });
//     }

//     render() {
//         return (
//             <div className="container">
//                 <Main changeUsername={this.changeUsername.bind(this)}/>
//                 <User username={this.state.username}/>
//             </div>
//         );
//     }
// }

// render(<App />, window.document.getElementById('app'));

import { createStore, combineReducers } from "redux";
import { maxHeaderSize } from "http";



//REDUCER
// Takes action and does someting (change the state)
//takes to arrgument
//has to return always state
//default value with inital state
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
                name: action.playload
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

//STORE
//can have mutlipe reducer
const store = createStore(combineReducers({matReducer, userReducer})); //(reducer, InitalState)

//SUBSCRIE
store.subscribe(()=> {
    console.log("Store updated", store.getState());
});

//ACTION
//Send to the store and the store know what to do
store.dispatch({
    type: "ADD",
    payload: 100
})

store.dispatch({
    type: "ADD",
    payload: 22
})

store.dispatch({
    type: "SUBSTRACT",
    payload: 80
})

store.dispatch({
    type: "SET_AGE",
    payload: 30
})


