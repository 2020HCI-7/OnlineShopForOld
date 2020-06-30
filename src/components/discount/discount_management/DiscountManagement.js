import React, { Component } from 'react';

import { Button } from 'antd';

import DiscountListController from "../discount_list/DiscountListController";
import DiscountAddController from '../discount_add/DiscountAddController';

class DiscountManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toDiscountAdd() {
        this.props.toDiscountAdd();
    }

    toDiscountList() {
        this.props.toDiscountList();
    }

    render() {
        //console.log(this.props.items);
        if (this.props.items != null) {
            return (
                <div id="DiscountManagementDiv">
                    {
                        this.props.items.showState === "list" ?
                            (
                                
                                <div id="DiscountManagementModifyDiv">
                                    <Button
                                        id="toDiscountListButton"
                                        type="link"
                                        onClick={this.toDiscountAdd.bind(this)}
                                    >
                                        添加优惠卷
                                    </Button>
                                    <DiscountListController
                                        initInfo={{
                                            storeId : this.props.items.storeId
                                        }}
                                    />
                                </div>
                            )
                            :
                            (
                                <div id="DiscountManagementModifyDiv">
                                    <Button
                                        id="toDiscountListButton"
                                        type="link"
                                        onClick={this.toDiscountList.bind(this)}
                                    >
                                        返回优惠卷列表
                                    </Button>
                                    < DiscountAddController
                                        initInfo={{
                                            storeId: this.props.items.storeId
                                        }}
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

export default DiscountManagement;





