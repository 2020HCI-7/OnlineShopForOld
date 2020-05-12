import React, { Component } from 'react';

import { Row, Col, Collapse, Button, Typography, Input, Select } from 'antd';

import UploadImageController from "../../UploadImage/UploadImageController";
import AccountToChinese from "../../../public_service/account/AccountToChinese";


const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;

var inputNumber = 0;

class ShopModify extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.finishShopInfoModify = this.finishShopInfoModify.bind(this);
    }

    /*action*/
    finishShopInfoModify() {
        this.props.finishShopInfoModify();
    }

    finishPasswordModify() {
        this.props.finishPasswordModify();
    }

    handleChange(key, value) {
        this.props.handleChange(key, value);
    }

    /*render*/
    showShopInfo() {
        return (
            
            <Panel
                id="shopModifyPanel"
                header="基本信息"
                key="1"
            >
                <Row id="shopModifyImgRow">
                    <Col id="shopModifyImgCol" span={24}>
                        <UploadImageController 
                            imageUrl={this.props.items.shopInfo.cover}
                            size={this.props.items.shopInfo.shopImageSize}
                            updateImage={this.props.items.shopInfo.updateImage}
                        />                      
                    </Col>
                </Row>   
                {Object.getOwnPropertyNames(this.props.items.shopInfo).map((key) => {
                    return (
                        this.showShopInfoRowItem(key)
                    );
                })}
                {
                    inputNumber !== 0 ?
                        (
                            <Row id="shopModifyRow">
                                <Col id="shopModifyCol" span={3}>
                                    {/*empty*/}
                                </Col>
                                <Col id="shopModifyCol" span={10}>
                                    <Text id="shopModifyButtonText">
                                        <Button
                                            id="shopModifyFinishModifyButton"
                                            type="Button"
                                            onClick={this.finishShopInfoModify} >
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

    showShopInfoRowItem(key) {
        if (typeof (this.props.items.shopInfoModifyAccess[key]) === "object") {
            inputNumber++;
            return (
                <Row
                    id="shopModifyRow"
                    key={key}
                >
                    <Col id="shopModifyCol" span={3}>
                        <Text
                            id="shopModifyText"
                        >
                            {AccountToChinese.toChinese(key)}
                        </Text>
                    </Col>
                    <Col id="shopModifyCol" span={10}>
                        <Select
                            id={"shopModifySelect"}
                            defaultValue={AccountToChinese.toChinese(this.props.items.shopInfo[key])}
                            onChange={(value) => this.handleChange(key, value)}
                        >
                            {
                                this.props.items.shopInfoModifyAccess[key].map((item) => {
                                    return (
                                        <Option
                                            id={"shopModifyInput_" + key}
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
            if (this.props.items.shopInfoModifyAccess[key] === "modify") {
                inputNumber++;
                return (
                    <Row
                        id="shopModifyRow"
                        key={key}
                    >
                        <Col id="shopModifyCol" span={3}>
                            <Text
                                id="shopModifyText"
                            >
                                {AccountToChinese.toChinese(key)}
                            </Text>
                        </Col>
                        <Col id="shopModifyCol" span={10}>
                            <Input
                                id={"shopModifyInput_" + key}
                                placeholder={this.props.items.shopInfo[key]}
                                onChange={(e) => this.handleChange(key, e.target.value)}
                            >
                            </Input>
                        </Col>
                    </Row>

                )
            }
            if (this.props.items.shopInfoModifyAccess[key] === "read") {
                return (
                    <Row
                        id="shopModifyRow"
                        key={key}
                    >
                        <Col id="shopModifyCol" span={3}>
                            <Text
                                id="shopModifyText"
                            >
                                {AccountToChinese.toChinese(key)}
                            </Text>
                        </Col>
                        <Col id="shopModifyCol" span={10}>
                            <Text
                                id={"shopModifyInfoText"}
                            >
                                {AccountToChinese.toChinese(this.props.items.shopInfo[key])}
                            </Text>
                        </Col>
                    </Row>
                )
            }
        }
    }

   

    render() {
        //console.log(this.props.items);
        if (this.props.items !== null) {
            return (
                <div id="shopModifyDiv">
                    <Collapse
                        id="shopModifyCollapse"
                    >
                        {this.showShopInfo()}
                    </Collapse>
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default ShopModify;





