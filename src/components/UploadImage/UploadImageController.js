import React, { Component } from "react";
import { Upload, message, Avatar } from 'antd';

class UploadImageController extends Component {
    constructor(props) {
        super(props);
        this.state={
            imageUrl : this.props.imageUrl,
        };
    }

    handleUpload(file) {
        const formData = new FormData();
        formData.append('file', file);

        var t = this;
        var res = null;
        if (this.props.commodityId !== undefined) {
            res = this.props.updateImage(formData, this.props.commodityId);
        }
        else if (this.props.storeId !== undefined) {
            res = this.props.updateImage(formData, this.props.storeId);
        }
        else {
            return
        }
        
        // console.log(this.props)
        // console.log(res)
        res.then(
            function (response) {
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function (data) {
                // console.log(data)
                if (data.success) {
                    t.setState({
                        imageUrl: t.props.imageUrl + "&time=" + (new Date()).getTime(),
                    })
                    message.success("上传成功");
                }
                else {
                    console.log(data.errmsg);
                    if (data.errmsg === "The server is processing image.") {
                        message.error("服务端繁忙，请稍后上传图片");
                    }
                }
            }
        ).catch(
            function (err) {
                message.error("上传失败");
                console.log(err);
            }
        );
    };

    render() {
        var t = this;
        
        const props = {
            name: "file",
            beforeUpload: function (file) {
                console.log(file.type)
                const isPngOrJpg = file.type === 'image/png' || file.type === 'image/jpeg';
                if (!isPngOrJpg) {
                    message.error('你只能上传PNG或JPG图片文件');
                    return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!isLt2M) {
                    message.error('图片大小不得大于1MB');
                    return false;
                }
                t.handleUpload(file);
                return false;
            },
            showUploadList: false,
        };

        return (
            <div>
                <Upload {...props}>
                    <Avatar
                        src={this.state.imageUrl}
                        shape="square" 
                        size={this.props.size}
                    />
                </Upload>
            </div>
        );
    };
}


export default UploadImageController;