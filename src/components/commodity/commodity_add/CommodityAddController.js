import React, { Component } from "react";

import CommodityAdd from "./CommodityAdd";
import CommodityAddActions from "./CommodityAddActions";
import CommodityAddStore from "./CommodityAddStore";

import "../../../css/components/commodity/CommodityAdd.css"

class CommodityAddController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        CommodityAddStore.addChangeListener(this.onChange);
        CommodityAddActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        CommodityAddStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: CommodityAddStore.getItems(),
        });
    }
    
    handleChange(key, value){
        CommodityAddActions.handleChangeAction(key, value);
    }

    finishCommodityAdd() {
        CommodityAddActions.finishCommodityAddAction();
    }

    render() {
        return(
        <CommodityAdd
            items = {this.state.items}
            handleChange = {this.handleChange.bind(this)}
            finishCommodityAdd={this.finishCommodityAdd.bind(this)}
        />
        )
    }
}

export default CommodityAddController;


