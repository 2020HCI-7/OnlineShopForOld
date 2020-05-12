import React, { Component } from "react";

import TabBar from "./TabBar";
import TabBarActions from "./TabBarActions";
import TabBarStore from "./TabBarStore";

class TabBarController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
        this.controllerOnFunctionButtonClick = this.controllerOnFunctionButtonClick.bind(this);
    }
    
    componentDidMount(){
        TabBarStore.addChangeListener(this.onChange);
        TabBarActions.initAction(this.props.functionList);
    }

    componentWillUnmount() {
        TabBarStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: TabBarStore.getItems(),
        })
    }

    controllerOnFunctionButtonClick(e){
        TabBarActions.onFunctionButtonClickAction(e);
    }

    render() {
        return(
        <TabBar
            items = {this.state.items}
            onFunctionButtonClick = {this.controllerOnFunctionButtonClick}
        />
        )
    }
}

export default TabBarController;


