import React, { Component } from 'react';
import { Row, Col, Collapse, Button, Typography, Input, Select,Table } from 'antd';
import UploadImageController from "../../UploadImage/UploadImageController";
import TagChooseController from "../../tag/tag_choose/TagChooseController";
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
                header="基本信息"
                key="1"
            >
                <Row id="shopModifyImgRow">
                    <Col id="shopModifyImgCol" span={24}>
                        <UploadImageController
                            imageUrl={this.props.items.commodityInfo.imgPath}
                            size={this.props.items.commodityInfo.commodityImageSize}
                            updateImage={this.props.items.commodityInfo.updataImage}
                            commodityId={this.props.items.commodityInfo.id}
                        />
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

    showCommodityComment() {
        return (
            <Panel
                id="commodityModifyPanel"
                header="商品评价信息"
                key="2"
            >
                <Table
                    columns={this.getTableColumns()}
                    dataSource={this.props.items.commodityComment}
                />
            </Panel>
            
        )
    }

    getTableColumns() {
        return (
            [
                {
                    title: "用户编号",
                    dataIndex: "commodityId",
                    key: "commodityId",
                    defaultSortOrder: "descend",
                    sorter: (a, b) => a.commodityId - b.commodityId,
                },
                {
                    title: "评价分数",
                    dataIndex: "grade",
                    key: "grade",
                    sorter: (a, b) => a.grade - b.grade,
                },
                {
                    title: "评价时间",
                    dataIndex: "time",
                    key: "time",
                    sorter: (a, b) => (a.time > b.time ? 1 : -1),
                },
                {
                    title: "评价内容",
                    dataIndex: "content",
                    key: "content",
                    sorter: (a, b) => (a.content > b.content ? 1 : -1),
                },
            ]
        );
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
                        <TagChooseController commodityInfo={this.props.items.commodityInfo} />
                        {this.showCommodityComment()}
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





