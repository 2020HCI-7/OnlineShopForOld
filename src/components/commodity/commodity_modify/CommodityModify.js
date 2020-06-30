import React, { Component } from 'react';
import { Row, Col, Collapse, Button, Typography, Input, Select, Card} from 'antd';
import UploadImageController from "../../UploadImage/UploadImageController";
import CommodityToChinese from "../../../public_service/commodity/CommodityToChinese";

const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;

var inputNumber = 0;

class CommodityModify extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.finishCommodityInfoModify = this.finishCommodityInfoModify.bind(this);
        this.finishPasswordModify = this.finishPasswordModify.bind(this);
    }

    /*action*/
    finishCommodityInfoModify() {
        this.props.finishCommodityInfoModify();
    }

    finishPasswordModify() {
        this.props.finishPasswordModify();
    }

    handleChange(key, value) {
        this.props.handleChange(key, value);
    }

    /*render*/
    showCommodityInfo() {
        return (
            <Panel
                id="commodityModifyPanel"
                header="商品信息"
                key="1"
            >
                <Row id="shopModifyImgRow">
                    <Col id="shopModifyImgCol" span={24}>
                        <Card
                            title="点击上传图片"
                            style={{ width: 150 }}
                            headStyle={{ textAlign: "center" }}
                            bodyStyle={{ alignContent: "center" }}
                        >
                            <UploadImageController
                                imageUrl={this.props.items.image.imgPath}
                                size={this.props.items.image.commodityImageSize}
                                updateImage={this.props.items.image.updateImage}
                                commodityId={this.props.items.commodityInfo.id}
                            />
                        </Card>
                    </Col>
                </Row>

                {Object.getOwnPropertyNames(this.props.items.commodityInfo).map((key) => {
                    return (
                        this.showCommodityInfoRowItem(key)
                    );
                })}
                {
                    inputNumber !== 0 ?
                        (
                            <Row id="commodityModifyRow">
                                <Col id="commodityModifyCol" span={3}>
                                    {/*empty*/}
                                </Col>
                                <Col id="commodityModifyCol" span={10}>
                                    <Text id="commodityModifyButtonText">
                                        <Button
                                            id="commodityModifyFinishModifyButton"
                                            type="Button"
                                            onClick={this.finishCommodityInfoModify} >
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

    showCommodityInfoRowItem(key) {
        if (typeof (this.props.items.commodityInfoModifyAccess[key]) === "object") {
            inputNumber++;
            return (
                <Row
                    id="commodityModifyRow"
                    key={key}
                >
                    <Col id="commodityModifyCol" span={3}>
                        <Text
                            id="commodityModifyText"
                        >
                            {CommodityToChinese.toChinese(key)}
                        </Text>
                    </Col>
                    <Col id="commodityModifyCol" span={10}>
                        <Select
                            id={"commodityModifySelect"}
                            defaultValue={CommodityToChinese.toChinese(this.props.items.commodityInfo[key])}
                            onChange={(value) => this.handleChange(key, value)}
                        >
                            {
                                this.props.items.commodityInfoModifyAccess[key].map((item) => {
                                    return (
                                        <Option
                                            id={"commodityModifyInput_" + key}
                                            key={item}
                                            value={item}
                                        >
                                            {CommodityToChinese.toChinese(item)}
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
            if (this.props.items.commodityInfoModifyAccess[key] === "modify") {
                inputNumber++;
                return (
                    <Row
                        id="commodityModifyRow"
                        key={key}
                    >
                        <Col id="commodityModifyCol" span={3}>
                            <Text
                                id="commodityModifyText"
                            >
                                {CommodityToChinese.toChinese(key)}
                            </Text>
                        </Col>
                        <Col id="commodityModifyCol" span={10}>
                            <Input
                                id={"commodityModifyInput_" + key}
                                placeholder={this.props.items.commodityInfo[key]}
                                onChange={(e) => this.handleChange(key, e.target.value)}
                            >
                            </Input>
                        </Col>
                    </Row>

                )
            }
            else if (this.props.items.commodityInfoModifyAccess[key] === "read") {
                return (
                    <Row
                        id="commodityModifyRow"
                        key={key}
                    >
                        <Col id="commodityModifyCol" span={3}>
                            <Text
                                id="commodityModifyText"
                            >
                                {CommodityToChinese.toChinese(key)}
                            </Text>
                        </Col>
                        <Col id="commodityModifyCol" span={10}>
                            <Text
                                id="commodityModifyInfoText"
                            >
                                {CommodityToChinese.toChinese(this.props.items.commodityInfo[key])}
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
                <div id="commodityModifyDiv">
                    <Collapse
                        id="commodityModifyCollapse"
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

export default CommodityModify;





