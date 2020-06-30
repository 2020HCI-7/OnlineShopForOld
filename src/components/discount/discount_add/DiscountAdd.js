import React, { Component } from 'react';

import { Row, Col, Collapse, Button, Typography, Input } from 'antd';

const { Text } = Typography;
const { Panel } = Collapse;



class DiscountAdd extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.finishDiscountAdd = this.finishDiscountAdd.bind(this);
    }

    /*action*/
    finishDiscountAdd() {
        this.props.finishDiscountAdd();
    }

    handleChange(key,value){
        this.props.handleChange(key, value);
    }

    render(){
        if (this.props.items !== null) {
            return (
                <div id="discountAddDiv">
                    <Collapse 
                        id="discountAddCollapse"
                    >
                        <Panel 
                            id="discountAddPanel"
                            header="添加优惠卷"   
                        key="1"
                        >
                            <div id="discountAddPasswordDiv">
                                <Row id="discountAddRow">
                                    <Col id="discountAddCol" span={3}>
                                        <Text id="discountAddText">
                                            满额：
                                        </Text>
                                    </Col>
                                    <Col id="discountAddCol" span={10}>
                                        <Input 
                                            id="discountAddUsernameInput" 
                                            placeholder="请输入满额" 
                                            onChange={(e) => this.handleChange("up", e.target.value)}
                                        >
                                        </Input>
                                    </Col>
                                </Row>
                                <Row id="discountAddRow">
                                    <Col id="discountAddCol" span={3}>
                                        <Text id="discountAddText">
                                            减额：
                                        </Text>
                                    </Col>
                                    <Col id="discountAddCol" span={10}>
                                        <Input 
                                            id="discountAddPasswordInput" 
                                            placeholder="请输入减额" 
                                            onChange={(e) => this.handleChange("dis", e.target.value)}
                                        >
                                        </Input>
                                    </Col>
                                </Row>
                                < Row id = "discountAddRow" >
                                    <Col id="discountAddCol" span={10}>
                                        < Text id = "discountAddButtonText" >
                                            <Button 
                                                id = "discountAddFinishAddButton"
                                                type="Button" 
                                                onClick={this.finishDiscountAdd} >
                                                确认添加
                                            </Button>
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default DiscountAdd;





