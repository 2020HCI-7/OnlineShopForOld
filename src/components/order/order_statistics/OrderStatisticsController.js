import React, { Component } from "react";

import OrderStatistics from "./OrderStatistics";
import OrderStatisticsActions from "./OrderStatisticsActions";
import OrderStatisticsStore from "./OrderStatisticsStore";

import "../../../css/components/order/OrderStatistics.css"

class OrderStatisticsController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        OrderStatisticsStore.addChangeListener(this.onChange);
        OrderStatisticsActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        OrderStatisticsStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: OrderStatisticsStore.getItems(),
        });
    }

    render() {
        return(
        <OrderStatistics
            items = {this.state.items}
        />
        )
    }
}

export default OrderStatisticsController;


