import React, { Component } from "react";

import AccountAdd from "./AccountAdd";
import AccountAddActions from "./AccountAddActions";
import AccountAddStore from "./AccountAddStore";

import "../../../css/components/account/AccountAdd.css"

class AccountAddController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        AccountAddStore.addChangeListener(this.onChange);
        AccountAddActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        AccountAddStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: AccountAddStore.getItems(),
        });
    }
    
    handleChange(key, value){
        AccountAddActions.handleChangeAction(key, value);
    }

    finishAccountAdd() {
        AccountAddActions.finishAccountAddAction();
    }

    render() {
        return(
        <AccountAdd
            items = {this.state.items}
            handleChange = {this.handleChange.bind(this)}
            finishAccountAdd={this.finishAccountAdd.bind(this)}
        />
        )
    }
}

export default AccountAddController;


