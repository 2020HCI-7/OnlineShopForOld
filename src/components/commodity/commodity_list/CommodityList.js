import React, { Component } from "react";

import { Table, Button } from "antd";

import CommodityToChinese from "../../../public_service/commodity/CommodityToChinese";

class CommodityList extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    toCommodityModify(commodityId){
        this.props.toCommodityModify(commodityId);
    }

    getTableColumns(){
        return(
            [
                {
                    title: "商品编号",
                    dataIndex: "id",
                    key: "id",
                    defaultSortOrder: "descend",
                    sorter: (a, b) => a.id - b.id,
                },
                {
                    title: "商品名称",
                    dataIndex: "name",
                    key: "name",
                    sorter: (a, b) => (a.name > b.name ? 1 : -1),
                },
                {
                    title: "单价",
                    dataIndex: "price",
                    key: "price",
                    sorter: (a, b) => a.price - b.price,
                },
                {
                    title: "状态",
                    dataIndex: "status",
                    key: "status",
                    sorter: (a, b) => (a.status > b.status ? 1 : -1),
                },
                {
                    key: "action",
                    render: (text, record) => (
                        <Button 
                            id="toCommodityModifyButton"
                            onClick={() => this.toCommodityModify(record.id)}    
                        >
                            修改详细信息
                        </Button>
                    ),
                },
            ]
        );
    }

    render(){
        if(this.props.items != null){
            return (
                <div id="accountListDiv">
                    <Table 
                        columns={this.getTableColumns()} 
                        dataSource={this.props.items.commodityList} 
                    />
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default CommodityList;





