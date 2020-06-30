import React, { Component } from "react";

import DiscountManagement from "./DiscountManagement";
import DiscountManagementActions from "./DiscountManagementActions";
import DiscountManagementStore from "./DiscountManagementStore";

class DiscountManagementController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        DiscountManagementStore.addChangeListener(this.onChange);
        DiscountManagementActions.initAction(this.props.initInfo);
        console.log(this.props.initInfo);
    }

    componentWillUnmount() {
        DiscountManagementStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: DiscountManagementStore.getItems(),
        })
    }

    toDiscountAdd(){
        DiscountManagementActions.toDiscountAddAction();
    }

    toDiscountList(){
        DiscountManagementActions.toDiscountListAction();
    }

    render() {
        return(
        <DiscountManagement
            items = {this.state.items}
            toDiscountAdd = {this.toDiscountAdd.bind(this)}
            toDiscountList = {this.toDiscountList.bind(this)}
        />
        )
    }
}

export default DiscountManagementController;


