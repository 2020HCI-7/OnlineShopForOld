import React, { Component } from "react";

import ShopModify from "./ShopModify";
import ShopModifyActions from "./ShopModifyActions";
import ShopModifyStore from "./ShopModifyStore";

import "../../../css/components/shop/ShopModify.css";

class ShopModifyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        ShopModifyStore.addChangeListener(this.onChange);
        ShopModifyActions.initAction(this.props.initInfo);
        
    }

    componentWillUnmount() {
        ShopModifyStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log(ShopModifyStore.getItems());
        this.setState({
            items: ShopModifyStore.getItems(),
        });
    }
    
    handleChange(key, value){
        ShopModifyActions.handleChangeAction(key, value);
    }

    finishShopInfoModify() {
        ShopModifyActions.finishShopInfoModifyAction();
    }

    render() {
        return(
        <ShopModify
            items = {this.state.items}
            handleChange = {this.handleChange.bind(this)}
            finishShopInfoModify={this.finishShopInfoModify.bind(this)}
        />
        )
    }
}

export default ShopModifyController;


