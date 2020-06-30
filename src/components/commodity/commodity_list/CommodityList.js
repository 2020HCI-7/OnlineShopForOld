import React, { Component } from "react";

import { Table, Button } from "antd";


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
                    dataIndex: "goodname",
                    key: "goodname",
                    sorter: (a, b) => (a.goodname > b.goodname ? 1 : -1),
                },
                {
                    title: "最高价",
                    dataIndex: "normalPrice",
                    key: "normalPrice",
                    sorter: (a, b) => a.normalPrice - b.normalPrice,
                },
                {
                    title: "最低价",
                    dataIndex: "leastPrice",
                    key: "leastPrice",
                    sorter: (a, b) => a.leastPrice - b.leastPrice,
                },
                {
                    title: "库存",
                    dataIndex: "storage",
                    key: "storage",
                    sorter: (a, b) => a.storage - b.storage,
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




