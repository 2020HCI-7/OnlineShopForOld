import React, { Component } from "react";

import User from "./User";
import UserActions from "./UserActions";
import UserStore from "./UserStore";

import "../../css/components/User.css";

class UserController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
        };
        this.controllerOnExitButtonClick = this.controllerOnExitButtonClick.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        UserStore.addChangeListener(this.onChange);
        UserActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this.onChange);
    }


    onChange() {
        this.setState({
            items: UserStore.getItems(),
        })
    }

    controllerOnExitButtonClick() {
        UserActions.exitLoginAction();
    }

    render() {
        return (
            <User
                items={this.state.items}
                onExitButtonClick={this.controllerOnExitButtonClick}
            />
        )
    }
}

export default UserController;
