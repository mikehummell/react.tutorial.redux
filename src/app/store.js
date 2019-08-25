import {createStore, combineReducers, applyMiddleware} from "redux"
import logger from "redux-logger";

import matReducer from "./reducers/matReducer";
import userReducer from "./reducers/userReducer";

//STORE
export default createStore(combineReducers(
    {matReducer, userReducer}),
    {},
    applyMiddleware( logger)
); 