import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Card ,Row ,Col ,Button ,Typography ,Input } from 'antd';
const { Text } = Typography;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    handleChange(key, value){
        this.props.handleChange(key, value);
    }

    finishRegister(){
        this.props.finishRegister();
    }
    
    render() {
        // console.log(this.props.items)
        if(this.props.items !== null){
            if(!this.props.items.registerState){
                return (
                    <div id="registerDiv">
                        <Card 
                            id="registerCard" 
                            title={this.props.items.constText.title}
                            extra={<a href={this.props.items.switch.url}>{this.props.items.switch.text}</a>}
                        >
                            <Row id="registerRow">
                                <Col id="registerCol" span={6}>
                                    <Text id="registerText">
                                        {this.props.items.constText.username}
                                    </Text>
                                </Col>
                                <Col id="registerCol" span={18}>
                                    <Input 
                                        id="registerUsernameInput"
                                        placeholder={this.props.items.constText.usernamePlaceholder} 
                                        onChange={(e) => this.handleChange("username", e.target.value)}
                                    >
                                    </Input>
                                </Col>
                            </Row>
                            <Row id="registerRow">
                                <Col id="registerCol" span={6}>
                                    {/*empty*/}
                                </Col>
                                <Col id="registerCol" span={18}>
                                    <Text 
                                        id="registerRemindText"
                                        disabled
                                    >
                                        {this.props.items.usernameRemindText}
                                    </Text>
                                </Col>
                            </Row>
                            <Row id="registerRow">
                                <Col id="registerCol" span={6}>
                                    <Text id="registerText">
                                        {this.props.items.constText.password}
                                    </Text>
                                </Col>
                                <Col id="registerCol" span={18}>
                                    <Input 
                                        id="registerPasswordInput" 
                                        placeholder={this.props.items.constText.passwordPlaceholder} 
                                        type="password"
                                        onChange={(e) => this.handleChange("password", e.target.value)}
                                    >
                                    </Input>
                                </Col>
                            </Row>
                            <Row id="registerRow">
                                <Col id="registerCol" span={6}>
                                    {/*empty*/}
                                </Col>
                                <Col id="registerCol" span={18}>
                                    <Text 
                                        id="registerRemindText"
                                        disabled
                                    >
                                        {this.props.items.passwordRemindText}
                                    </Text>
                                </Col>
                            </Row>
                            <Row id="registerRow">
                                <Col id="registerCol" span={6}>
                                    <Text id="registerText">
                                        {this.props.items.constText.passwordConfirm}
                                    </Text>
                                </Col>
                                <Col id="registerCol" span={18}>
                                    <Input 
                                        id="registerPasswordInput" 
                                        placeholder={this.props.items.constText.passwordConfirmPlaceholder} 
                                        type="password"
                                        onChange={(e) => this.handleChange("passwordConfirm", e.target.value)}
                                    >
                                    </Input>
                                </Col>
                            </Row>
                            <Row id="registerRow">
                                <Col id="registerCol" span={6}>
                                    {/*empty*/}
                                </Col>
                                <Col id="registerCol" span={18}>
                                    <Text 
                                        id="registerRemindText"
                                        disabled
                                    >
                                        {this.props.items.passwordConfirmRemindText}
                                    </Text>
                                </Col>
                            </Row>
                            <Row id="registerRow">
                                <Col id="registerCol" span={24}>
                                    <Button 
                                        id="finishRegisterButton" 
                                        type="Button" 
                                        onClick={() => this.finishRegister()} 
                                    >
                                        {this.props.items.constText.register}
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                )
            }
            else{
                return (
                    <Redirect to={this.props.items.url}/>
                )
            }
        }
        return (
            <div></div>
        )
    }
}

export default Register;