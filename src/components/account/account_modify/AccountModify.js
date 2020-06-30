import React, { Component } from 'react';

import { Row, Col, Collapse, Button, Typography, Input, Select } from 'antd';

import AccountToChinese from "../../../public_service/account/AccountToChinese";

const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;

var inputNumber = 0;

class AccountModify extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /*action*/
    finishUserInfoModify() {
        this.props.finishUserInfoModify();
    }

    finishPasswordModify() {
        this.props.finishPasswordModify();
    }

    handleChange(key, value) {
        this.props.handleChange(key, value);
    }

    /*render*/
    showUserInfo() {
        return (
            <Panel
                id="accountModifyPanel"
                header="基本信息"
                key="1"
            >
                {Object.getOwnPropertyNames(this.props.items.userInfoModifyAccess).map((key) => {
                    return (
                        this.showUserInfoRowItem(key)
                    );
                })}
                {
                    inputNumber !== 0 ?
                        (
                            <Row id="accountModifyRow">
                                <Col id="accountModifyCol" span={3}>
                                    {/*empty*/}
                                </Col>
                                <Col id="accountModifyCol" span={10}>
                                    <Text id="accountModifyButtonText">
                                        <Button
                                            id="accountModifyFinishModifyButton"
                                            type="Button"
                                            onClick={() => this.finishUserInfoModify()} 
                                        >
                                            确认修改
                                        </Button>
                                    </Text>
                                </Col>
                            </Row>
                        )
                        :
                        ("")
                }
            </Panel>
        )
    }

    showUserInfoRowItem(key) {
        if (typeof (this.props.items.userInfoModifyAccess[key]) === "object") {
            inputNumber++;
            return (
                <Row
                    id="accountModifyRow"
                    key={key}
                >
                    <Col id="accountModifyCol" span={3}>
                        <Text
                            id="accountModifyText"
                        >
                            {AccountToChinese.toChinese(key)}
                        </Text>
                    </Col>
                    <Col id="accountModifyCol" span={10}>
                        <Select
                            id={"accountModifySelect"}
                            defaultValue={AccountToChinese.toChinese(this.props.items.userInfo[key])}
                            onChange={(value) => this.handleChange(key, value)}
                        >
                            {
                                this.props.items.userInfoModifyAccess[key].map((item) => {
                                    return (
                                        <Option
                                            id={"accountModifyInput_" + key}
                                            key={item}
                                            value={item}
                                        >
                                            {AccountToChinese.toChinese(item)}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Col>
                </Row>

            )
        }
        else {
            if (this.props.items.userInfoModifyAccess[key] === "modify") {
                inputNumber++;
                return (
                    <Row
                        id="accountModifyRow"
                        key={key}
                    >
                        <Col id="accountModifyCol" span={3}>
                            <Text
                                id="accountModifyText"
                            >
                                {AccountToChinese.toChinese(key)}
                            </Text>
                        </Col>
                        <Col id="accountModifyCol" span={10}>
                            <Input
                                id={"accountModifyInput_" + key}
                                placeholder={this.props.items.userInfo[key]}
                                onChange={(e) => this.handleChange(key, e.target.value)}
                            >
                            </Input>
                        </Col>
                    </Row>

                )
            }
            else if (this.props.items.userInfoModifyAccess[key] === "read") {
                return (
                    <Row
                        id="accountModifyRow"
                        key={key}
                    >
                        <Col id="accountModifyCol" span={3}>
                            <Text
                                id="accountModifyText"
                            >
                                {AccountToChinese.toChinese(key)}
                            </Text>
                        </Col>
                        <Col id="accountModifyCol" span={10}>
                            <Text
                                id={"accountModifyInfoText"}
                            >
                                {AccountToChinese.toChinese(this.props.items.userInfo[key])}
                            </Text>
                        </Col>
                    </Row>
                )
            }
        }
    }

    showPasswordModify() {
        if (this.props.items.remindText !== null) {
            return (
                <Panel
                    id="accountModifyPanel"
                    header="密码设置"
                    key="2"
                >
                    <div id="accountModifyPasswordDiv">
                        <Row id="accountModifyRow">
                            <Col id="accountModifyCol" span={3}>
                                <Text id="accountModifyText">
                                    原密码：
                                </Text>
                            </Col>
                            <Col id="accountModifyCol" span={10}>
                                <Input
                                    id="accountModifyOldPasswordInput"
                                    placeholder="请输入原始密码"
                                    type="password"
                                    onChange={(e) => this.handleChange("oldPassword", e.target.value)}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row id="accountModifyRow">
                            <Col id="accountModifyCol" span={3}>
                                {/*empty*/}
                            </Col>
                            <Col id="accountModifyCol" span={10}>
                                <Text
                                    id="accountModifyRemindText"
                                    disabled
                                >
                                    {this.props.items.remindText.oldPasswordRemindText}
                                </Text>
                            </Col>
                        </Row>
                        <Row id="accountModifyRow">
                            <Col id="accountModifyCol" span={3}>
                                <Text id="accountModifyText">
                                    新密码：
                                </Text>
                            </Col>
                            <Col id="accountModifyCol" span={10}>
                                <Input
                                    id="accountModifyNewPasswordInput"
                                    placeholder="请输入新密码"
                                    type="password"
                                    onChange={(e) => this.handleChange("newPassword", e.target.value)}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row id="accountModifyRow">
                            <Col id="accountModifyCol" span={3}>
                                {/*empty*/}
                            </Col>
                            <Col id="accountModifyCol" span={10}>
                                <Text
                                    id="accountModifyRemindText"
                                    disabled
                                >
                                    {this.props.items.remindText.newPasswordRemindText}
                                </Text>
                            </Col>
                        </Row>
                        <Row id="accountModifyRow">
                            <Col id="accountModifyCol" span={3}>
                                <Text id="accountModifyText">
                                    确认新密码：
                                </Text>
                            </Col>
                            <Col id="accountModifyCol" span={10}>
                                <Input
                                    id="accountModifyNewPasswordConfirmInput"
                                    placeholder="请确认新密码"
                                    type="password"
                                    onChange={(e) => this.handleChange("newPasswordConfirm", e.target.value)}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row id="accountModifyRow">
                            <Col id="accountModifyCol" span={3}>
                                {/*empty*/}
                            </Col>
                            <Col id="accountModifyCol" span={10}>
                                <Text
                                    id="accountModifyRemindText"
                                    disabled
                                >
                                    {this.props.items.remindText.newPasswordConfirmRemindText}
                                </Text>
                            </Col>
                        </Row>
                        <Row id="accountModifyRow">
                            <Col id="accountModifyCol" span={3}>
                                {/*empty*/}
                            </Col>
                            <Col id="accountModifyCol" span={10}>
                                <Text id="accountModifyButtonText">
                                    <Button 
                                        id="accountModifyFinishModifyButton" 
                                        type="Button" 
                                        onClick={() => this.finishPasswordModify()} 
                                    >
                                        确认修改
                                    </Button>
                                </Text>
                            </Col>
                        </Row>
                    </div>
                </Panel>
            )
        }
    }

    render() {
        //console.log(this.props.items);
        if (this.props.items !== null) {
            return (
                <div id="accountModifyDiv">
                    <Collapse
                        id="accountModifyCollapse"
                    >
                        {this.showUserInfo()}
                        {this.showPasswordModify()}
                    </Collapse>
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default AccountModify;





