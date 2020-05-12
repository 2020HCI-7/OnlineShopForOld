import React, { Component } from "react";

import Admin from "./Admin";
import AdminActions from "./AdminActions";
import AdminStore from "./AdminStore";

import "../../css/pages/Admin.css";

class AdminController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount() {
        AdminStore.addChangeListener(this.onChange);
        AdminActions.initAction();
    }

    componentWillUnmount() {
        AdminStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: AdminStore.getItems(),
        })
    }

    render() {
        return(
            <Admin
                items = {this.state.items}
            />
        )
    }
}

export default AdminController;
