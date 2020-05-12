import React, { Component } from 'react';
import { Row, Col, Collapse, Button, Typography, Input, Select, Table  } from 'antd';
import OrderToChinese from "../../../public_service/order/OrderToChinese";

const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;

var inputNumber = 0;

class OrderModify extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.finishOrderInfoModify=this.finishOrderInfoModify.bind(this);
    }

    /*action*/
    handleChange(key,value){
        this.props.handleChange(key, value);
    }

    finishOrderInfoModify() {
        this.props.finishOrderInfoModify();
    }

    /*render*/
    showInfo(panelHeader, panelKey, info){
        return(
            <Panel 
                id="orderModifyPanel"
                header={panelHeader}
                key={panelKey}
            >
                {Object.getOwnPropertyNames(info).map((key) => {
                    return(
                        <Row 
                            id="orderModifyRow" 
                            key={key}
                        >
                            <Col id="orderModifyCol" span={3}>
                                <Text 
                                    id="orderModifyText"
                                >
                                    {OrderToChinese.toChinese(key)}
                                </Text>
                            </Col>
                            <Col id="orderModifyCol" span={10}>
                                {this.showInfoColItem(info, key, panelKey)}
                            </Col>
                        </Row>
                    );
                })}
                    
            </Panel>
        )
    }

    showInfoColItem(info, key, panelKey) {
        if(typeof(this.props.items.orderInfoModifyAccess[key]) === "object"){
            inputNumber++;
            return(
                <Select
                    id={"orderModifySelect"}
                    defaultValue={OrderToChinese.toChinese(info[key])}
                    onChange={(value) => this.handleChange(panelKey + "-" + key, value)}
                >
                {
                    this.props.items.orderInfoModifyAccess[key].map((item) => {
                        return(
                            <Option 
                                id={"orderModifyInput_" + key}
                                key={item}
                                value={item}
                            >
                                {OrderToChinese.toChinese(item)}
                            </Option>
                        )  
                    })
                }
                </Select>
            )
        }
        else{
            if(this.props.items.orderInfoModifyAccess[key]){
                inputNumber++;
                return(
                    <Input 
                        id={"orderModifyInput_" + key}
                        placeholder={info[key]}
                        onChange={(e) => this.handleChange(panelKey + "-" + key, e.target.value)}
                    >
                    </Input>
                )
            }
            else{
                return(
                    <Text
                        id={"orderModifyInfoText"} 
                    >
                        {info[key]}
                    </Text>
                )
            }
        }
    }

    getTableColumns(){
        return(
            [
                {
                    title: "商品编号",
                    dataIndex: "id",
                    key: "id",
                },
                {
                    title: "商品名称",
                    dataIndex: "name",
                    key: "name",
                },
                {
                    title: "商品数量",
                    dataIndex: "amount",
                    key: "amount",
                },
                {
                    title: "商品价格",
                    dataIndex: "price",
                    key: "price",
                },
            ]
        );
    }

    showOrderItemInfo(){
        return(
            <Panel
                id="orderModifyPanel"
                header="订单商品信息"
                key="2"
            >
                <Table 
                    columns={this.getTableColumns()} 
                    dataSource={this.props.items.orderItems} 
                />
            </Panel>
        )
    }

    render(){
        
        if(this.props.items !== null){
            console.log(this.props.items);
            return (
                <div id="orderModifyDiv">
                    <Collapse 
                        id="orderModifyCollapse"
                    >
                        <Panel 
                            id="orderModifyPanel"
                            header="订单信息"
                            key="0"
                        >
                            <Collapse 
                                id="orderModifyCollapse"
                            >
                                {this.showInfo("基础信息", "orderInfo", this.props.items.orderInfo)}
                                {this.showInfo("物流信息", "deliveryInfo", this.props.items.deliveryInfo)}
                                {this.showOrderItemInfo()}
                            </Collapse>
                            {
                                inputNumber !== 0 ? 
                                (
                                    <Row id="orderModifyRow">
                                        <Col id="orderModifyCol" span={10}>
                                            <Text id="orderModifyButtonText">
                                                <Button 
                                                    id="orderModifyFinishModifyButton" 
                                                    type="Button" 
                                                    onClick={this.finishOrderInfoModify} >
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
                    </Collapse>
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default OrderModify;





