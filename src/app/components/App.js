import React from "react";
import {connect} from "react-redux";

import { User } from './User';
import { Main } from './Main';
;

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

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        mat: state.matReducer
    };
};

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

//connect component to store
export default connect(mapStateToProps, mapDispatchToProps)(App);