import React, { Component } from 'react';
import { Menu } from 'antd';
import AccountFetch from "../../public_service/account/AccountFetch";
const { SubMenu } = Menu;

class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.onFunctionButtonClick = this.onFunctionButtonClick.bind(this);
        this.parseFunctionListToMenu = this.parseFunctionListToMenu.bind(this);
        this.parseFunctionItemToSubmenu = this.parseFunctionItemToSubmenu.bind(this);
    }

    onFunctionButtonClick(e){
        this.props.onFunctionButtonClick(e);
    }

    parseFunctionListToMenu(){
        var homeHref = AccountFetch.getHomeUrl();
        homeHref = homeHref.slice(7, homeHref.length);
        var href = window.location.href;
        var defaultSelectedKeys = "";
        var defaultOpenKeysArray = [];
        var temp = "";

        while((temp = href.slice(href.lastIndexOf('/') + 1)) !== homeHref) {
            defaultSelectedKeys = "/" + temp + defaultSelectedKeys;
            href = href.slice(0,href.lastIndexOf('/'));
        }

        var defaultSelectedKeysArray = new Array(defaultSelectedKeys);
        while((temp = defaultSelectedKeys.slice(0, defaultSelectedKeys.lastIndexOf('/'))) !== "") {
            defaultOpenKeysArray.push(temp);
            defaultSelectedKeys = temp;
        }

        return(
            <Menu
                id="tabBarMenu"
                defaultOpenKeys={defaultOpenKeysArray}
                defaultSelectedKeys={defaultSelectedKeysArray}
                mode="inline"
                onClick={this.onFunctionButtonClick}
            >
            {Object.getOwnPropertyNames(this.props.items).map((key) => {
                return(
                    this.parseFunctionItemToSubmenu(key, this.props.items[key])
                );
            })}
            </Menu>
        );
    }

    parseFunctionItemToSubmenu(functionKey, functionItem) {
        if(typeof(functionItem) === "string"){
            return(
                <Menu.Item key={functionItem}>
                    {functionKey}    
                </Menu.Item>
            );
        }
        else{
            return(
                <SubMenu
                    key={functionKey.slice(functionKey.lastIndexOf('-') + 1)}
                    title={
                        <span>
                            {functionKey.slice(0, functionKey.lastIndexOf('-'))}
                        </span>
                    }
                >
                {Object.getOwnPropertyNames(functionItem).map((key, index) => {
                    return(
                        this.parseFunctionItemToSubmenu(key, functionItem[key])
                    );
                })}
                </SubMenu>
            );
        }
    }

    render(){
        if(this.props.items != null){
            return (
                <div id="tabBarDiv">
                    {this.parseFunctionListToMenu()}
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default TabBar;





