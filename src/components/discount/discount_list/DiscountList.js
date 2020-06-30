import React, { Component } from "react";

import { Table, Button } from "antd";



class DiscountList extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    deleteDiscount(record) {
        this.props.deleteDiscount(record);
    }

    getTableColumns(){
        return(
            [
                {
                    title: "优惠卷编号",
                    dataIndex: "id",
                    key: "id",
                    //defaultSortOrder: "descend",
                    sorter: (a, b) => a.id - b.id,
                },
                {
                    title: "满额",
                    dataIndex: "up",
                    key: "up",
                    sorter: (a, b) => (a.up > b.up ? 1 : -1),
                },
                {
                    title: "减额",
                    dataIndex: "dis",
                    key: "dis",
                    sorter: (a, b) => (a.dis - b.dis ? 1 : -1),
                },
                {
                    key: "action",
                    render: (text, record) => (
                        <Button 
                            id="toDiscountModifyButton"
                            onClick={(record) => this.deleteDiscount(record)}    
                        >
                            删除优惠卷
                        </Button>
                    ),
                },
            ]
        );
    }

    render(){
        if (this.props.items != null) {
            // console.log(this.props.items.userList)
            return (
                <div id="discountListDiv">
                    <Table 
                        columns={this.getTableColumns()} 
                        dataSource={this.props.items.discountList} 
                    />
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default DiscountList;





