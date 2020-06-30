import React, { Component } from "react";

import DiscountList from "./DiscountList";
import DiscountListActions from "./DiscountListActions";
import DiscountListStore from "./DiscountListStore";



class DiscountListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        DiscountListStore.addChangeListener(this.onChange);
        DiscountListActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        DiscountListStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: DiscountListStore.getItems(),
        })
    }

    deleteDiscount(record) {
        DiscountListActions.deleteDiscountAction(record)
    }

    render() {
        return(
        <DiscountList
            items = {this.state.items}
            deleteDiscount = {
                this.deleteDiscount
            }
        />
        )
    }
}

export default DiscountListController;



  
