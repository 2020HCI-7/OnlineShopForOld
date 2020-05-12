import React, { Component } from 'react';

import { Button } from 'antd';

import AccountModifyController from "../account_modify/AccountModifyController";
import AccountListController from "../account_list/AccountListController";
import AccountAddController from '../account_add/AccountAddController';

class AccountManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toAccountAdd() {
        this.props.toAccountAdd();
    }

    toAccountModify(userId) {
        this.props.toAccountModify(userId);
    }

    toAccountList() {
        this.props.toAccountList();
    }

    render() {
        //console.log(this.props.items);
        if (this.props.items != null) {
            return (
                <div id="AccountManagementDiv">
                    {
                        this.props.items.showState === "list" ?
                            (
                                <div id="AccountManagementModifyDiv">
                                    <AccountListController
                                        initInfo={
                                            {
                                                userRoleMaster: this.props.items.userRoleMaster,
                                                userRoleList: this.props.items.userRoleModify,
                                                toAccountModify: this.toAccountModify.bind(this),
                                            }
                                        }
                                    />
                                </div>
                            )
                            :
                            (
                                <div id="AccountManagementModifyDiv">
                                    <Button
                                        id="toAccountListButton"
                                        type="link"
                                        onClick={this.toAccountList.bind(this)}
                                    >
                                        返回用户列表
                                </Button>
                                    {console.log(this.props.items)}
                                    {
                                        this.props.items.showState === "modify" ?

                                            (
                                                <AccountModifyController
                                                    initInfo={
                                                        {
                                                            userId: this.props.items.selectedUserId,
                                                            userRoleMaster: this.props.items.userRoleMaster,
                                                            userRoleModify: this.props.items.userRoleModify,
                                                        }
                                                    }
                                                />
                                            )
                                            :
                                            (
                                                <AccountAddController
                                                    initInfo={
                                                        {
                                                            userRoleMaster: this.props.items.userRoleMaster,
                                                            userRoleModify: this.props.items.userRoleModify,
                                                        }
                                                    }
                                                />
                                            )
                                    }
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

export default AccountManagement;





