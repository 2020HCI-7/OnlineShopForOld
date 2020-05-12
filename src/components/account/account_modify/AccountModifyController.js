import React, { Component } from "react";

import AccountModify from "./AccountModify";
import AccountModifyActions from "./AccountModifyActions";
import AccountModifyStore from "./AccountModifyStore";

import "../../../css/components/account/AccountModify.css"

class AccountModifyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        AccountModifyStore.addChangeListener(this.onChange);
        AccountModifyActions.initAction(this.props.initInfo);
        
    }

    componentWillUnmount() {
        AccountModifyStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: AccountModifyStore.getItems(),
        });
    }
    
    handleChange(key, value){
        AccountModifyActions.handleChangeAction(key, value);
    }

    finishUserInfoModify() {
        AccountModifyActions.finishUserInfoModifyAction();
    }

    finishPasswordModify() {
        AccountModifyActions.finishPasswordModifyAction();
    }

    render() {
        return(
        <AccountModify
            items = {this.state.items}
            handleChange = {this.handleChange.bind(this)}
            finishUserInfoModify={this.finishUserInfoModify.bind(this)}
            finishPasswordModify={this.finishPasswordModify.bind(this)}
        />
        )
    }
}

export default AccountModifyController;


