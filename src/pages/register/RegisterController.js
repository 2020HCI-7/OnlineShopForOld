import React, { Component } from "react";

import Register from "./Register";
import RegisterActions from "./RegisterActions";
import RegisterStore from "./RegisterStore";

import "../../css/pages/Register.css";

class RegisterController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
        };
    }

    componentDidMount() {
        RegisterStore.addChangeListener(() => this.onChange());
        RegisterActions.initAction();
    }

    componentWillUnmount() {
        RegisterStore.removeChangeListener(() => this.onChange());
    }

    onChange() {
        this.setState({
            items: RegisterStore.getItems(),
        })
    }

    handleChange(key, value) {
        RegisterActions.handleChangeAction(key, value);
    }

    finishRegister() {
        RegisterActions.finishRegisterAction();
    }

    render() {
        return (
            <Register
                items={this.state.items}
                handleChange={(key, value) => this.handleChange(key, value)}
                finishRegister={() => this.finishRegister()}
            />
        )
    }
}

export default RegisterController;
