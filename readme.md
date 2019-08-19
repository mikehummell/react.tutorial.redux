

## Install
npm install redux --save

## General

### Reducer
Takes action and does someting (change the state)
takes to arrgument
has to return always state
```javascript
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            state = state + action.payload
            break;
        case "SUBSTRACT":
            break;
    };
    return state;
}
```

### STORE
can have mutlipe reducer
```javascript
const store = createStore(reducer,1); //(reducer, InitalState)
```

### SUBSCRIBE
```javascript
store.subscribe(()=> {
    console.log("Store updated", store.getState());
});
```

### ACTION
Send to the store and the store know what to do
```javascript
store.dispatch({
    type: "ADD",
    payload: 10
})
```

## Immutable

Because Object are reference (pointer), for state we need to create a copy and save that
```javascript
state = {
    result: state.result,
    lastValues: state.lastValues,
    //Override
    result: state.result + action.payload
};
```
or
```javascript
state = {
    ...state,
    //Override
    result: state.result + action.payload
};
```
Or with object
```javascript
state = {
    ...state,
    result: state.result + action.payload,
    lastValues: [...state.lastValues, action.payload]
};
```

## Multibe Reduce

Mutliple reducer can be sperated. e.g per topics. the action ty0e must be unique. 
It create subset of state. 
```javascript
const store = createStore(combineReducers({matReducer, userReducer})); //(reducer, InitalState)
```
Inital state can be added directly to the reducer
```javascript

const userReducer = (state = {
    name: "Max", age: 27
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            ...
```

