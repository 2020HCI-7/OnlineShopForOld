import React, { Component } from "react";

import OrderList from "./OrderList";
import OrderListActions from "./OrderListActions";
import OrderListStore from "./OrderListStore";

class OrderListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
        this.toOrderModify = this.toOrderModify.bind(this);
    }
    
    componentDidMount(){
        OrderListStore.addChangeListener(this.onChange);
        OrderListActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        OrderListStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: OrderListStore.getItems(),
        })
    }

    toOrderModify(OrderId){
        this.props.toOrderModify(OrderId);
    }

    render() {
        return(
        <OrderList
            items = {this.state.items}
            toOrderModify = {this.toOrderModify}
        />
        )
    }
}

export default OrderListController;



  
