import React, { Component } from 'react';
import { Tag, Input, Button, Collapse, Row, Col, message } from 'antd';
import CommodityFetch from "../../../public_service/commodity/CommodityFetch";

import "../../../css/components/tag/TagChoose.css";

const { Panel } = Collapse;
const { CheckableTag } = Tag;

class TagChooseController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            showTags: [],
            tagCheckedList: [],
            showTagCheckedList: [],
            inputValue: "请输入标签名进行检索",
        };
    };

    componentDidMount() {
        var response = CommodityFetch.fetchGetTagList();
        var t = this;
        response.then(
            function (response) {
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function (data) {
                if (data.success) {
                    console.log(data);
                    var temp = data.tagList.map((item) => {
                        return item.name;
                    })
                    var tempCheckedList = {};
                    var tempTagIDList = {};
                    data.tagList.map((item) => {
                        tempCheckedList[item.name] = false;
                        tempTagIDList[item.name] = item.id;
                        return item;
                    })
                    t.props.commodityInfo.tags.map((item) => {
                        tempCheckedList[item.name] = true;
                        return item;
                    })
                    t.setState({
                        tags: temp,
                        showTags: temp,
                        tagCheckedList: tempCheckedList,
                        tagIDList: tempTagIDList,
                    })
                }
                else {
                    console.log(data.errmsg, 1);
                }
            }
        ).catch(function (err) {
            console.log(err);
        });
    }

    handleChange = (index, checked) => {
        var tempCheckedList = this.state.tagCheckedList;
        tempCheckedList[this.state.showTags[index]] = checked;
        this.setState({
            tagCheckedList: tempCheckedList,
        });
    };

    handleInputChange = (e) =>{
        var keyword = e.target.value;
        var tempShowTags = [];
        this.state.tags.map((item,index) => {
            if(item.indexOf(keyword) !== -1){
                tempShowTags.push(item);
            }
            return item;
        })
        this.setState({
            showTags: tempShowTags,
        });
    }

    handleFinishChoose = () => {
        var response = null;
        var temp = this.props.commodityInfo;
        console.log(this.props.commodityInfo);
        var tags = [];
        Object.keys(this.state.tagCheckedList).map((item) =>{
            if(this.state.tagCheckedList[item]){
                tags.push({
                    id: this.state.tagIDList[item],
                    name: item
                })
            }
            return item;
        })
        temp["tags"] = tags;
        console.log(temp);
        response = CommodityFetch.fetchModifyCommodityInfo(temp);
        response.then(
            function (response) {
                console.log(response);
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function (data) {
                if (data.success) {
                    message.success("修改成功", 1);
                }
                else {
                    message.error("修改失败", 1);
                }
            }
        ).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        console.log(this.state);
        if (this.state.tags.length !== 0) {
            return (


                <Collapse
                    id="tagChooseCollapse"
                >
                    <Panel
                        id="tagChoosePanel"
                        header="标签管理"
                        key="1"
                    >
                        <Row id="tagChooseInputRow">
                            <Col id="tagChooseInputCol" span={10}>
                                <Input
                                    id="tagChooseInput"
                                    type="text"
                                    size="default"
                                    style={{ width: 200 }}
                                    placeholder={this.state.inputValue}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row id="tagChooseTagRow">
                            <Col id="tagChooseTagCol" span={24}>
                                {
                                    this.state.showTags.map((item, index) => {
                                        return (
                                            <CheckableTag
                                                key={index}
                                                checked={this.state.tagCheckedList[item]}
                                                onChange={(checked) => this.handleChange(index, checked)}
                                            >
                                                {item}
                                            </CheckableTag>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                        <Row id="tagChooseButtonRow">
                            <Col id="tagChooseButtonCol" span={3}>
                                <Button
                                    id="tagChooseButton"
                                    onClick={this.handleFinishChoose}
                                >
                                    提交修改
                                </Button>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            );
        }
        else {
            return (
                <div></div>
            )
        }

    }
}
export default TagChooseController;