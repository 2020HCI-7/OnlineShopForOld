import React, { Component } from 'react';
import { Row, Col, Typography, Button} from 'antd';
const { Text } = Typography;

class User extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    updateAvatar(){
        this.props.updateAvatar();
    }

    onExitButtonClick(){
        this.props.onExitButtonClick();
    }

    render(){
        if(this.props.items != null){
            return (
                <div id="userDiv">
                    <Row id="userRow">
                        <Col id="userTextCol" span={6}>
                            <Text id="userNameText">
                                {this.props.items.username}
                            </Text>
                        </Col>
                        <Col id="userLinkCol" span={18}>
                            <Button 
                                id="userLink"
                                type="link"
                                onClick={() => this.onExitButtonClick()}
                            >
                                {this.props.items.constText.exitLogin}
                            </Button>
                        </Col>
                    </Row>      
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}

export default User;