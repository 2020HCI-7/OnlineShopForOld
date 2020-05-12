import React, { Component } from "react";

import CommodityList from "./CommodityList";
import CommodityListActions from "./CommodityListActions";
import CommodityListStore from "./CommodityListStore";



class CommodityListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
        this.toCommodityModify = this.toCommodityModify.bind(this);
    }
    
    componentDidMount(){
        CommodityListStore.addChangeListener(this.onChange);
        CommodityListActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        CommodityListStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: CommodityListStore.getItems(),
        })
    }

    toCommodityModify(commodityId){
        this.props.toCommodityModify(commodityId);
    }

    render() {
        return(
        <CommodityList
            items = {this.state.items}
            toCommodityModify = {this.toCommodityModify}
        />
        )
    }
}

export default CommodityListController;



  
