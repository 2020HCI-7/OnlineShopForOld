import React, { Component } from "react";

import DiscountAdd from "./DiscountAdd";
import DiscountAddActions from "./DiscountAddActions";
import DiscountAddStore from "./DiscountAddStore";

import "../../../css/components/discount/DiscountAdd.css"

class DiscountAddController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        DiscountAddStore.addChangeListener(this.onChange);
        DiscountAddActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        DiscountAddStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: DiscountAddStore.getItems(),
        });
    }
    
    handleChange(key, value){
        DiscountAddActions.handleChangeAction(key, value);
    }

    finishDiscountAdd() {
        DiscountAddActions.finishDiscountAddAction();
    }

    render() {
        return(
        <DiscountAdd
            items = {this.state.items}
            handleChange = {this.handleChange.bind(this)}
            finishDiscountAdd={this.finishDiscountAdd.bind(this)}
        />
        )
    }
}

export default DiscountAddController;


