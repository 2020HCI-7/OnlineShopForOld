import React, { Component } from "react";

import CommodityModify from "./CommodityModify";
import CommodityModifyActions from "./CommodityModifyActions";
import CommodityModifyStore from "./CommodityModifyStore";

import "../../../css/components/commodity/CommodityModify.css"

class CommodityModifyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        CommodityModifyStore.addChangeListener(this.onChange);
        CommodityModifyActions.initAction(this.props.initInfo);
        
    }

    componentWillUnmount() {
        CommodityModifyStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: CommodityModifyStore.getItems(),
        });
    }
    
    handleChange(key, value){
        CommodityModifyActions.handleChangeAction(key, value);
    }

    finishCommodityInfoModify() {
        CommodityModifyActions.finishCommodityInfoModifyAction();
    }

    render() {
        return(
        <CommodityModify
            items = {this.state.items}
            handleChange = {this.handleChange.bind(this)}
            finishCommodityInfoModify={this.finishCommodityInfoModify.bind(this)}
        />
        )
    }
}

export default CommodityModifyController;


