import {createStore, combineReducers, applyMiddleware} from "redux"
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import matReducer from "./reducers/matReducer";
import userReducer from "./reducers/userReducer";


//STORE
export default createStore(combineReducers(
    {matReducer, userReducer}),
    {},
    applyMiddleware( logger, thunk, promise)
); 