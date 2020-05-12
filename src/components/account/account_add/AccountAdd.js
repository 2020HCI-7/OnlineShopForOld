import React, { Component } from 'react';

import { Row, Col, Collapse, Button, Typography, Input } from 'antd';

const { Text } = Typography;
const { Panel } = Collapse;



class AccountAdd extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.finishAccountAdd = this.finishAccountAdd.bind(this);
    }

    /*action*/
    finishAccountAdd() {
        this.props.finishAccountAdd();
    }

    handleChange(key,value){
        this.props.handleChange(key, value);
    }

    render(){
        if(this.props.items !== null){
            return (
                <div id="accountAddDiv">
                    <Collapse 
                        id="accountAddCollapse"
                    >
                        <Panel 
                            id="accountAddPanel"
                            header="添加用户"   
                        key="1"
                        >
                            <div id="accountAddPasswordDiv">
                                <Row id="accountAddRow">
                                    <Col id="accountAddCol" span={3}>
                                        <Text id="accountAddText">
                                            用户名：
                                        </Text>
                                    </Col>
                                    <Col id="accountAddCol" span={10}>
                                        <Input 
                                            id="accountAddUsernameInput" 
                                            placeholder="请输入用户名" 
                                            onChange={(e) => this.handleChange("username", e.target.value)}
                                        >
                                        </Input>
                                    </Col>
                                </Row>
                                <Row id="accountAddRow">
                                    <Col id="accountAddCol" span={3}>
                                        {/*empty*/}
                                    </Col>
                                    <Col id="accountAddCol" span={10}>
                                        <Text 
                                            id="accountAddRemindText"
                                            disabled
                                        >
                                            {this.props.items.remindText.usernameRemindText}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row id="accountAddRow">
                                    <Col id="accountAddCol" span={3}>
                                        <Text id="accountAddText">
                                            密码：
                                        </Text>
                                    </Col>
                                    <Col id="accountAddCol" span={10}>
                                        <Input 
                                            id="accountAddPasswordInput" 
                                            placeholder="请输入密码" 
                                            type="password"
                                            onChange={(e) => this.handleChange("password", e.target.value)}
                                        >
                                        </Input>
                                    </Col>
                                </Row>
                                <Row id="accountAddRow">
                                    <Col id="accountAddCol" span={3}>
                                        {/*empty*/}
                                    </Col>
                                    <Col id="accountAddCol" span={10}>
                                        <Text 
                                            id="accountAddRemindText"
                                            disabled
                                        >
                                            {this.props.items.remindText.passwordRemindText}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row id="accountAddRow">
                                    <Col id="accountAddCol" span={3}>
                                        <Text id="accountAddText">
                                            确认密码：
                                        </Text>
                                    </Col>
                                    <Col id="accountAddCol" span={10}>
                                        <Input 
                                            id="accountAddPasswordConfirmInput" 
                                            placeholder="请确认密码" 
                                            type="password"
                                            onChange={(e) => this.handleChange("passwordConfirm", e.target.value)}
                                        >
                                        </Input>
                                    </Col>
                                </Row>
                                <Row id="accountAddRow">
                                    <Col id="accountAddCol" span={3}>
                                        {/*empty*/}
                                    </Col>
                                    <Col id="accountAddCol" span={10}>
                                        <Text 
                                            id="accountAddRemindText"
                                            disabled
                                        >
                                            {this.props.items.remindText.passwordConfirmRemindText}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row id="accountAddRow">
                                    <Col id="accountAddCol" span={3}>
                                        {/*empty*/}
                                    </Col>
                                    <Col id="accountAddCol" span={10}>
                                        <Text id="accountAddButtonText">
                                            <Button id="accountAddFinishModifyButton" type="Button" onClick={this.finishAccountAdd} >
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

export default AccountAdd;





