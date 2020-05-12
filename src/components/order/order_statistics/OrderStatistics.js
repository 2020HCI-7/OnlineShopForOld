import React, { Component } from 'react';
import { Row, Col, Collapse, Typography, Table, Progress } from 'antd';

const { Text } = Typography;
const { Panel } = Collapse;

class OrderStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /*render*/
    showOrderAmount() {
        return (
            <Collapse
                id="orderStatisticsCollapse"
            >
                <Panel
                    id="orderStatisticsPanel"
                    header="订单基础汇总信息："
                    key="0"
                >
                    <Row
                        id="orderModifyRow"
                        key={0}
                    >
                        <Col id="orderModifyCol" span={3}>
                            <Text
                                id="orderModifyText"
                            >
                                订单总数：
                    </Text>
                        </Col>
                        <Col id="orderModifyCol" span={10}>
                            <Text
                                id="orderModifyText"
                            >
                                {this.props.items.orderAmount}
                            </Text>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>

        )
    }

    showPriceRatio() {
        return (
            <Collapse
                id="orderStatisticsCollapse"
            >
                <Panel
                    id="orderStatisticsPanel"
                    header="订单总价分布："
                    key="0"
                >
                    <Row
                        id="orderModifyRow"
                        key={1}
                    >
                        <Col id="orderModifyCol" span={3}>
                            <Text
                                id="orderModifyText"
                            >
                                小于50元
                    </Text>
                        </Col>
                        <Col id="orderModifyCol" span={10}>
                            <Progress percent={100 * this.props.items.priceRatio[0]} status="active" />
                        </Col>
                    </Row>
                    <Row
                        id="orderModifyRow"
                        key={1}
                    >
                        <Col id="orderModifyCol" span={3}>
                            <Text
                                id="orderModifyText"
                            >
                                50元至200元
                    </Text>
                        </Col>
                        <Col id="orderModifyCol" span={10}>
                            <Progress percent={100 * this.props.items.priceRatio[1]} status="active" />
                        </Col>
                    </Row>
                    <Row
                        id="orderModifyRow"
                        key={1}
                    >
                        <Col id="orderModifyCol" span={3}>
                            <Text
                                id="orderModifyText"
                            >
                                大于200元
                    </Text>
                        </Col>
                        <Col id="orderModifyCol" span={10}>
                            <Progress percent={100 * this.props.items.priceRatio[2]} status="active" />
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        )
    }

    showTimeRatio() {
        return (
            <Collapse
                id="orderStatisticsCollapse"
            >
                <Panel
                    id="orderStatisticsPanel"
                    header="订单时间分布："
                    key="0"
                >
                    <Row
                        id="orderModifyRow"
                        key={1}
                    >
                        <Col id="orderModifyCol" span={3}>
                            <Text
                                id="orderModifyText"
                            >
                                00:00至07:59
                    </Text>
                        </Col>
                        <Col id="orderModifyCol" span={10}>
                            <Progress percent={100 * this.props.items.timeRatio[0]} status="active" />
                        </Col>
                    </Row>
                    <Row
                        id="orderModifyRow"
                        key={1}
                    >
                        <Col id="orderModifyCol" span={3}>
                            <Text
                                id="orderModifyText"
                            >
                                09:00至15:59
                    </Text>
                        </Col>
                        <Col id="orderModifyCol" span={10}>
                            <Progress percent={100 * this.props.items.timeRatio[1]} status="active" />
                        </Col>
                    </Row>
                    <Row
                        id="orderModifyRow"
                        key={1}
                    >
                        <Col id="orderModifyCol" span={3}>
                            <Text
                                id="orderModifyText"
                            >
                                17:00至23:59
                    </Text>
                        </Col>
                        <Col id="orderModifyCol" span={10}>
                            <Progress percent={100 * this.props.items.timeRatio[2]} status="active" />
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        )
    }

    showCommodity() {
        return (
            <Collapse
                id="orderStatisticsCollapse"
            >
                <Panel
                    id="orderStatisticsPanel"
                    header="以销售商品汇总信息："
                    key="0"
                >
                    <Table
                        columns={this.getTableColumns()}
                        dataSource={this.props.items.commoditiesTable}
                    />
                </Panel>
            </Collapse>

        )
    }

    getTableColumns() {
        return (
            [
                {
                    title: "商品编号",
                    dataIndex: "id",
                    key: "id",
                    defaultSortOrder: "descend",
                    sorter: (a, b) => a.id - b.id,
                },
                {
                    title: "商品名称",
                    dataIndex: "name",
                    key: "name",
                    sorter: (a, b) => (a.name > b.name ? 1 : -1),
                },
                {
                    title: "商品价格",
                    dataIndex: "price",
                    key: "price",
                    sorter: (a, b) => a.price - b.price,
                },
                {
                    title: "商品总销售数量",
                    dataIndex: "amount",
                    key: "amount",
                    sorter: (a, b) => a.amount - b.amount,
                },
                {
                    title: "商品总销售额",
                    dataIndex: "total",
                    key: "total",
                    sorter: (a, b) => a.total - b.total,
                },
            ]
        );
    }

    render() {
        if (this.props.items !== null) {
            console.log(this.props.items);
            return (
                <div id="orderStatisticsDiv">
                    <Collapse
                        id="orderStatisticsCollapse"
                    >
                        <Panel
                            id="orderStatisticsPanel"
                            header="订单统计"
                            key="0"
                        >
                            {this.showOrderAmount()}
                            {this.showPriceRatio()}
                            {this.showTimeRatio()}
                            {this.showCommodity()}

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

export default OrderStatistics;





