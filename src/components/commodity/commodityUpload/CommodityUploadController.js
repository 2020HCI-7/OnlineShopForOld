import React, { Component } from "react";
import { Upload, message, Avatar } from 'antd';
import ImageFetch from "../../public_service/image/ImageFetch";

class CommodityUploadController extends Component {
    constructor(props) {
        super(props);
        this.state={
            imageUrl : ImageFetch.getServerImgUrl() + this.props.imageUrl,
        };
        console.log(this.props)
    }

    handleUpload(file) {
        const formData = new FormData();
        formData.append('file', file);

        var t = this;
        var response = null;
        if(this.props.commodityId){
            response = this.props.updateImage(formData, this.props.commodityId);
        }
        else{
            response = this.props.updateImage(formData);
        }
        
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
                    t.setState({
                        imageUrl : ImageFetch.getServerImgUrl() + data.imageUrl,
                    })
                    message.success("上传成功");
                }
                else {
                    message.error("上传失败");
                    console.log(data.errmsg);
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
            beforeUpload: function(file){
                const isJpgOrPng = file.type === 'xlsx' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    message.error('你只能上传Excel文件');
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
                    <Button
                        id="toCommodityListButton"
                        type="link"
                    >
                        上传商品信息
                    </Button>
                </Upload>
            </div>
        );
    };
}


export default UploadImageController;