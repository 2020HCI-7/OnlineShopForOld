import React, { Component } from "react";

import Dealer from "./Dealer";
import DealerActions from "./DealerActions";
import DealerStore from "./DealerStore";

import "../../css/pages/Dealer.css";

class DealerController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        DealerStore.addChangeListener(this.onChange);
        DealerActions.initAction();
    }

    componentWillUnmount() {
        DealerStore.removeChangeListener(this.onChange);
    }

    onChange() {
        //alert("callback");
        this.setState({
            items: DealerStore.getItems(),
        })
    }

    render() {
        return(
            <Dealer
                items = {this.state.items}
            />
        )
    }
}

export default DealerController;
