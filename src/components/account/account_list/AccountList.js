import React, { Component } from "react";

import { Table, Button } from "antd";



class AccountList extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    toAccountModify(userId){
        this.props.toAccountModify(userId);
    }

    getTableColumns(){
        return(
            [
                {
                    title: "用户编号",
                    dataIndex: "id",
                    key: "id",
                    //defaultSortOrder: "descend",
                    sorter: (a, b) => a.id - b.id,
                },
                {
                    title: "姓名",
                    dataIndex: "username",
                    key: "username",
                    sorter: (a, b) => (a.username > b.username ? 1 : -1),
                },
                {
                    title: "用户身份",
                    dataIndex: "userRole",
                    key: "userRole",
                    sorter: (a, b) => (a.userRole  - b.userRole ? 1 : -1),
                },
                {
                    title: "禁用状态",
                    dataIndex: "status",
                    key: "status",
                    sorter: (a, b) => (a.status - b.status ? 1 : -1),
                },
                {
                    key: "action",
                    render: (text, record) => (
                        <Button 
                            id="toAccountModifyButton"
                            onClick={() => this.toAccountModify(record.id)}    
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
            // console.log(this.props.items.userList)
            return (
                <div id="accountListDiv">
                    <Table 
                        columns={this.getTableColumns()} 
                        dataSource={this.props.items.userList} 
                    />
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default AccountList;





