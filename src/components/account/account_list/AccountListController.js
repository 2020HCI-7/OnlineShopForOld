import React, { Component } from "react";

import AccountList from "./AccountList";
import AccountListActions from "./AccountListActions";
import AccountListStore from "./AccountListStore";



class AccountListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
        this.toAccountModify = this.toAccountModify.bind(this);
    }
    
    componentDidMount(){
        AccountListStore.addChangeListener(this.onChange);
        AccountListActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        AccountListStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: AccountListStore.getItems(),
        })
    }

    toAccountModify(userId){
        this.props.initInfo.toAccountModify(userId);
    }

    render() {
        return(
        <AccountList
            items = {this.state.items}
            toAccountModify = {this.toAccountModify}
        />
        )
    }
}

export default AccountListController;



  
