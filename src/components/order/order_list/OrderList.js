import React, { Component } from "react";

import { Table, Button } from "antd";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    toOrderModify(orderId){
        this.props.toOrderModify(orderId);
    }

    getTableColumns() {
        return(
            [
                {
                    title: "订单编号",
                    dataIndex: "orderId",
                    key: "orderId",
                    defaultSortOrder: "descend",
                    sorter: (a, b) => a.orderId - b.orderId,
                },
                {
                    title: "店铺编号",
                    dataIndex: "storeId",
                    key: "storeId",
                    sorter: (a, b) => a.storeId - b.storeId,
                },
                {
                    title: "消费者编号",
                    dataIndex: "consumerId",
                    key: "consumerId",
                    sorter: (a, b) => a.consumerId - b.consumerId,
                },
                {
                    title: "创建时间",
                    dataIndex: "time",
                    key: "time",
                    sorter: (a, b) => (a.time > b.time ? 1 : -1 ),
                },
                {
                    title: "订单状态",
                    dataIndex: "status",
                    key: "status",
                    sorter: (a, b) => (a.status > b.status ? 1 : -1),
                },
                {
                    title: "订单总价",
                    dataIndex: "totalPrice",
                    key: "totalPrice",
                    sorter: (a, b) => a.totalPrice - b.totalPrice,
                },
                {
                    key: "action",
                    render: (text, record) => (
                        <Button 
                            id="toOrderModifyButton"
                            onClick={() => this.toOrderModify(record.orderId)}    
                        >
                            修改详细信息
                        </Button>
                    ),
                },
            ]
        );
    }

    render(){
        if (this.props.items != null) {
            return (
                <div id="orderListDiv">
                    <Table 
                        columns={this.getTableColumns()} 
                        dataSource={JSON.parse(JSON.stringify(this.props.items.orderList))} 
                    />
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default OrderList;





