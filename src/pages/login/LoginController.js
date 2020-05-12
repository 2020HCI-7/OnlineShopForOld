import React, { Component } from "react";

import Login from "./Login";
import LoginActions from "./LoginActions";
import LoginStore from "./LoginStore";

import "../../css/pages/Login.css";

class LoginController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
        };
    }

    componentDidMount() {
        LoginStore.addChangeListener(() => this.onChange());
        LoginActions.initAction();
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(() => this.onChange());
    }

    onChange() {
        this.setState({
            items: LoginStore.getItems(),
        })
    }

    handleChange(key, value) {
        LoginActions.handleChangeAction(key, value);
    }

    finishLogin() {
        LoginActions.finishLoginAction();
    }

    render() {
        return (
            <Login
                items={this.state.items}
                handleChange={(key, value) => this.handleChange(key, value)}
                finishLogin={() => this.finishLogin()}
            />
        )
    }
}

export default LoginController;
