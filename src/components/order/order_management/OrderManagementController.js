import React, { Component } from "react";

import OrderManagement from "./OrderManagement";
import OrderManagementActions from "./OrderManagementActions";
import OrderManagementStore from "./OrderManagementStore";

class OrderManagementController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        OrderManagementStore.addChangeListener(this.onChange);
        OrderManagementActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        OrderManagementStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: OrderManagementStore.getItems(),
        })
    }

    toOrderModify(orderId){
        OrderManagementActions.toOrderModifyAction(orderId);
    }

    toOrderList(){
        OrderManagementActions.toOrderListAction();
    }

    render() {
        return(
        <OrderManagement
            items = {this.state.items}
            toOrderModify = {this.toOrderModify.bind(this)}
            toOrderList = {this.toOrderList.bind(this)}
        />
        )
    }
}

export default OrderManagementController;


