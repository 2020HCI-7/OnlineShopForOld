import React, { Component } from 'react';
import { Row, Col, Collapse, Button, Typography, Input } from 'antd';
import CommodityToChinese from "../../../public_service/commodity/CommodityToChinese";

const { Text } = Typography;
const { Panel } = Collapse;

class CommodityAdd extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.finishCommodityAdd = this.finishCommodityAdd.bind(this);
    }

    /*action*/
    finishCommodityAdd() {
        this.props.finishCommodityAdd();
    }

    handleChange(key,value){
        this.props.handleChange(key, value);
    }

    showCommodityInfo() {
        return(
            <Panel 
                id="commodityAddPanel"
                header="商品信息"
                key="1"
            >
                {Object.getOwnPropertyNames(this.props.items.commodityInfo).map((key) => {
                    return(
                        <Row 
                            id="commodityAddRow" 
                            key={key}
                        >
                            <Col id="commodityAddCol" span={3}>
                                <Text 
                                    id="commodityAddText"
                                >
                                    {CommodityToChinese.toChinese(key)}
                                </Text>
                            </Col>
                            <Col id="commodityAddCol" span={10}>
                                {this.showCommodityInfoColItem(key)}
                            </Col>
                        </Row>
                    );
                })}
                <Row id="commodityAddRow">
                    <Col id="commodityAddCol" span={3}>
                        {/*empty*/}
                    </Col>
                    <Col id="commodityAddCol" span={10}>
                        <Text id="commodityAddButtonText">
                            <Button 
                                id="commodityAddFinishAddButton" 
                                type="Button" 
                                onClick={this.finishCommodityAdd} 
                            >
                                确认添加
                            </Button>
                        </Text>
                    </Col>
                </Row>    
            </Panel>
        )
    }

    showCommodityInfoColItem(key) {
        return(
            <Input 
                id={"commodityAddInput_" + key}
                placeholder={this.props.items.commodityInfo[key]}
                onChange={(e) => this.handleChange(key, e.target.value)}
            >
            </Input>
        )
    }

    render(){
        if(this.props.items !== null){
            return (
                <div id="commodityAddDiv">
                    <Collapse 
                        id="commodityAddCollapse"
                    >
                        {this.showCommodityInfo()}
                    </Collapse>
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default CommodityAdd;





