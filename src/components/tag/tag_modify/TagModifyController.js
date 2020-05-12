import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon, Collapse, Button, Row, Col,message } from 'antd';
import CommodityFetch from "../../../public_service/commodity/CommodityFetch";

import "../../../css/components/tag/TagModify.css";

const { Panel } = Collapse;



class TagModifyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: ['Unremovable'],
            inputVisible: false,
            inputValue: '',
            closeLen: 1,
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
                    var tempLen = temp.length;
                    t.setState({
                        tags: temp,
                        closeLen: tempLen,
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

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    handleFinishModify = () => {
        for (var i = this.state.closeLen; i < this.state.tags.length; i++) {

            var response = CommodityFetch.fetchModifyTag({ name: this.state.tags[i] });
            var t = this;
            console.log(this.state);
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
                        if(i === t.state.tags.length - 2){
                            
                        }
                        message.success("修改成功",1);
                        t.componentDidMount();
                        
                    }
                    else {
                        message.error("修改失败",1);
                    }
                }
            ).catch(function (err) {
                message.error("修改失败",1);
                console.log(err);
            });
        }
    }

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <Collapse
                id="tagModifyCollapse"
            >
                <Panel
                    id="tagModifyPanel"
                    header="标签管理"
                    key="2"
                >
                    {tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag key={tag} closable={index >= this.state.closeLen} onClose={() => this.handleClose(tag)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                                tagElem
                            );
                    })}
                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                            <Icon type="plus" /> 添加标签
                        </Tag>
                    )}
                    {
                        this.state.tags.length > this.state.closeLen ?
                            (
                                <Row id="tagModifyRow">
                                    <Col id="tagModifyCol" span={3}>
                                        <Button
                                            id="tagModifyButton"
                                            onClick={this.handleFinishModify}
                                        >
                                            提交修改
                                        </Button>
                                    </Col>
                                </Row>
                            )
                            :
                            (
                                <div></div>
                            )
                    }
                </Panel>
            </Collapse>
        );
    }
}

export default TagModifyController;