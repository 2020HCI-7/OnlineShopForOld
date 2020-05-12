import React, { Component } from 'react';

import { Typography, Layout } from 'antd';

import UserController from "../../components/user/UserController";
import TabBarController from "../../components/tab_bar/TabBarController";
import AccountModifyController from "../../components/account/account_modify/AccountModifyController";
import AccountManagementController from "../../components/account/account_management/AccountManagementController";
import OrderManagementController from "../../components/order/order_management/OrderManagementController";

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    
    parseContent(){
        switch(this.props.items.content){
            case "/admin":
                return(
                    <div></div>
                )
            case "/admin/account/my_account":
                return(
                    <AccountModifyController
                        initInfo = {
                            {
                                userId: this.props.items.account.userId,
                                userRoleMaster: this.props.items.account.userRole,
                                userRoleModify: this.props.items.account.userRole,
                            }
                        }
                    />
                )
            case "/admin/account/account_management/dealer":
                return (
                    <AccountManagementController
                        initInfo = {
                            {
                                userRoleMaster: this.props.items.account.userRole,
                                userRoleModify: "dealer",
                            }
                        }
                    />
                )
            case "/admin/order/all_order":
                return(
                    <OrderManagementController
                        initInfo = {
                            {
                                userId: this.props.items.account.userId,
                                userRole: this.props.items.account.userRole,
                            }
                        }
                    />
                )
            default:
                return(
                    <div></div>
                )
        }
    }

    render() {
        if (this.props.items !== null) {
            return (
                <div id="AdminDiv">
                    <Layout id="AdminLayout">
                        <Header
                            id="AdminHeader"
                        >
                            <UserController
                                initInfo={
                                    {
                                        username : this.props.items.account.username,
                                        userRole : this.props.items.account.userRole,
                                    }
                                }
                            />
                        </Header>
                    </Layout>
                    <Layout 
                        id="AdminLayout"
                        style={{ minHeight: "100vh" }}
                    >
                        <Sider 
                            id="AdminSider"
                            theme="light"
                            width="250"
                            collapsed={false}
                        >
                            <TabBarController
                                functionList={this.props.items.tabBar}
                            />
                        </Sider>
                        <Layout id="AdminLayout">
                            <Content id="AdminContent">
                                {this.parseContent()}
                            </Content>
                            <Footer id="AdminFooter">
                                <Text id="AdminText">
                                    ©2019 Created by NO.7 Team
                                </Text>
                            </Footer>
                        </Layout>
                    </Layout>
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}

export default Admin;