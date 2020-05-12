import React, { Component } from "react";

import CommodityManagement from "./CommodityManagement";
import CommodityManagementActions from "./CommodityManagementActions";
import CommodityManagementStore from "./CommodityManagementStore";

class CommodityManagementController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        CommodityManagementStore.addChangeListener(this.onChange);
        CommodityManagementActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        CommodityManagementStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: CommodityManagementStore.getItems(),
        })
    }

    toCommodityAdd(){
        CommodityManagementActions.toCommodityAddAction();
    }

    toCommodityModify(commodityId){
        CommodityManagementActions.toCommodityModifyAction(commodityId);
    }

    toCommodityList(){
        CommodityManagementActions.toCommodityListAction();
    }

    render() {
        return(
        <CommodityManagement
            items = {this.state.items}
            toCommodityAdd = {this.toCommodityAdd.bind(this)}
            toCommodityModify = {this.toCommodityModify.bind(this)}
            toCommodityList = {this.toCommodityList.bind(this)}
        />
        )
    }
}

export default CommodityManagementController;


