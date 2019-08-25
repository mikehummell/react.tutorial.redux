

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
## Middleware
You can hook between the action.
Create a big fat Arrow Fuction chain 
```javascript
//Middleware function
const myLogger = (store)=> (next) => (action)=> {
    console.log("Logged Action: ", action);
    next(action); //Does not go to the reducer without the next.
}
```
And add it to the third argument. The second argument is the state, but this will get overwriten by the reducer
```javascript
//STORE
const store = createStore(combineReducers({matReducer, userReducer}),{},applyMiddleware(myLogger)); 
```
## Third party middleware.
npm install redux-logger --save
```javascript
import logger from "redux-logger"

const store = createStore(combineReducers(
    {matReducer, userReducer}),
    {},
    applyMiddleware( logger)
); 
```

## Connection Redux with react
### Inside Index.js
A Provider which gives the store and can handle acction

```javascript
import {Provider} from "react-redux";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('app')
);
```

### Inside App.js
The class is not extern anymore, because the whole class get pass to a function which is then external.
this.props.setName refer to the action which is linked in mapDispatchToProps
this.props.user.name is a prop from the redux satat linked in mapStatetoProps
```javascript
import {connect} from "react-redux";
class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Main changeUsername={() => this.props.setName("Anna")}/>
                <User username={this.props.user.name}/>
            </div>
        );
    }
}
```   
A function to link the state to the props.
You can also use only one reducer
```javascript
const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        mat: state.matReducer
    };
};
```
And the function to link action to props.
```javascript
const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch({
                type: "SET_NAME",
                payload: name
            });
        }
    };
};
```
And now the magic. Link everything together and export it:
```javascript
export default connect(mapStateToProps, mapDispatchToProps)(App);
```
## Container & components

| **FolderName** | **Descipton**                                              | **Example**  |
|----------------|------------------------------------------------------------|--------------|
| Component      | Stupide Component -const -have only return                 | -Main -User  |
| Container      | Intelligente Component -Extend React -have render-function | -App         |

## Split application

| **file** | **description** |
|----------|-------------|
|app/actions/xxxActions.js| All action function whicht call the redudcer, for not to have the code in the component 7
|app/component/componentName.js | Stupid Component function |
|app/container/App.js |Intelligente Component with the reder function and mapStateToProps & mapDispatchToProps. Import the actions |
|app/reducers/xxxReducer.js| Reducer code with the logic |
|app/index.js| the render funciton for mapping to the div. Import store and the container |
|app/store.js | the store itself. import reducers |
|index.html| Mainpage with the div and the bundle.js import |