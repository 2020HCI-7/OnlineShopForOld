import React, { Component } from "react";

import OrderModify from "./OrderModify";
import OrderModifyActions from "./OrderModifyActions";
import OrderModifyStore from "./OrderModifyStore";

import "../../../css/components/order/OrderModify.css"

class OrderModifyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        OrderModifyStore.addChangeListener(this.onChange);
        OrderModifyActions.initAction(this.props.initInfo);
        
    }

    componentWillUnmount() {
        OrderModifyStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: OrderModifyStore.getItems(),
        });
    }
    
    handleChange(key, value){
        OrderModifyActions.handleChangeAction(key, value);
    }

    finishOrderInfoModify() {
        OrderModifyActions.finishOrderInfoModifyAction();
    }

    render() {
        return(
        <OrderModify
            items = {this.state.items}
            handleChange = {this.handleChange.bind(this)}
            finishOrderInfoModify={this.finishOrderInfoModify.bind(this)}
        />
        )
    }
}

export default OrderModifyController;


