import React, { Component } from 'react';

import OrderModifyController from "../order_modify/OrderModifyController";
import OrderListController from "../order_list/OrderListController"
import { Button } from 'antd';

class OrderManagement extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    toOrderModify(orderId){
        this.props.toOrderModify(orderId);
    }

    toOrderList(){
        this.props.toOrderList();
    }

    render(){
        //console.log(this.props.items);
        if(this.props.items != null){
            return (
                <div id="OrderManagementDiv">
                    {
                        this.props.items.showState === "list" ?
                        (
                            <OrderListController
                                initInfo={
                                    {
                                        userId: this.props.items.userId,
                                    }
                                }
                                toOrderModify={this.toOrderModify.bind(this)}
                            />
                        )
                        :
                        (
                            <div id="OrderManagementModifyDiv">
                                <Button
                                    id="toOrderListButton"
                                    type="link"
                                    onClick={this.toOrderList.bind(this)}
                                >
                                    返回订单列表
                                </Button>
                                <OrderModifyController
                                    initInfo={
                                        {
                                            orderId: this.props.items.selectedOrderId,
                                            userId: this.props.items.userId,
                                            userRole: this.props.items.userRole,
                                        }
                                    }
                                />
                            </div>                            
                        )
                    }
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default OrderManagement;





