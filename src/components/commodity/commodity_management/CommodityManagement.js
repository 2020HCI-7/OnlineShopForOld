import React, { Component } from 'react';

import CommodityModifyController from "../commodity_modify/CommodityModifyController";
import CommodityListController from "../commodity_list/CommodityListController";
import CommodityAddController from '../commodity_add/CommodityAddController';

import { Button } from 'antd';

class CommodityManagement extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    toCommodityAdd(){
        this.props.toCommodityAdd();
    }

    toCommodityModify(commodityId){
        this.props.toCommodityModify(commodityId);
    }

    toCommodityList(){
        this.props.toCommodityList();
    }

    render(){
        //console.log(this.props.items);
        if(this.props.items != null){
            return (
                <div id="CommodityManagementDiv">
                    {
                        this.props.items.showState === "list" ?
                        (
                            
                            <div id="CommodityManagementModifyDiv">
                                <Button
                                    id="toCommodityListButton"
                                    type="link"
                                    onClick={this.toCommodityAdd.bind(this)}
                                >
                                    添加商品
                                </Button>
                                <CommodityListController
                                    initInfo={
                                        {
                                            userRole: this.props.items.userRoleModify,
                                        }
                                    }
                                    toCommodityModify={this.toCommodityModify.bind(this)}
                                />
                            </div>
                        )
                        :
                        (
                            <div id="CommodityManagementModifyDiv">
                                <Button
                                    id="toCommodityListButton"
                                    type="link"
                                    onClick={this.toCommodityList.bind(this)}
                                >
                                    返回商品列表
                                </Button>
                                {
                                    this.props.items.showState === "modify" ?

                                    (
                                        <CommodityModifyController
                                            initInfo={
                                                {
                                                    commodityId: this.props.items.selectedCommodityId,
                                                }
                                            }
                                        />
                                    )
                                    :
                                    (
                                        <CommodityAddController
                                            initInfo={
                                                {
                                                    userId: this.props.items.userId,
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

export default CommodityManagement;





