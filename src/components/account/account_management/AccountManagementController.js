import React, { Component } from "react";

import AccountManagement from "./AccountManagement";
import AccountManagementActions from "./AccountManagementActions";
import AccountManagementStore from "./AccountManagementStore";

class AccountManagementController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        AccountManagementStore.addChangeListener(this.onChange);
        AccountManagementActions.initAction(this.props.initInfo);
        console.log(this.props.initInfo);
    }

    componentWillUnmount() {
        AccountManagementStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: AccountManagementStore.getItems(),
        })
    }

    toAccountAdd(){
        AccountManagementActions.toAccountAddAction();
    }

    toAccountModify(userId){
        AccountManagementActions.toAccountModifyAction(userId);
    }

    toAccountList(){
        AccountManagementActions.toAccountListAction();
    }

    render() {
        return(
        <AccountManagement
            items = {this.state.items}
            toAccountAdd = {this.toAccountAdd.bind(this)}
            toAccountModify = {this.toAccountModify.bind(this)}
            toAccountList = {this.toAccountList.bind(this)}
        />
        )
    }
}

export default AccountManagementController;


