import { cookieRequest } from "../../../api/cookieRequest"
import { hostUrl, goodSearch, imageUrl } from "../../../api/url"

const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();

let timeId = null;
Page({
    data: {
        history: [],
        hot: ['新鲜芹菜', '大红枣', '滋补桂圆干'],
        // result: [
        //     {
        //         id: 1,
        //         url: '../details/details?id=1',
        //         thumb: '/image/s4.png',
        //         title: '瓜子 100g',
        //         price: 0.01
        //     },
        //     {
        //         id: 2,
        //         url: '../details/details?id=2',
        //         thumb: '/image/s5.png',
        //         title: '新鲜芹菜 500g',
        //         price: 0.02
        //     }
        // ],
        result: [],
        showKeywords: false,
        keywords: ['山东肚脐橙', '湖南冰糖橙', '麻涌香蕉', '冰糖心苹果'],
        userInput: '',
        showResult: false,

        //语音
        recordState: false, //录音状态
        content:'',//内容
    },
    cancelSearch() {
        this.setData({
            showResult: false,
            showKeywords: false,
            userInput: ''
        })
    },
    searchInput(e) {
        if(!e.detail.value){
            this.setData({
                showKeywords: false
            })
        }else{
            if(!this.data.showKeywords){
                timeId && clearTimeout(timeId);

                var that = this;
                var requestInfo = {
                    clearCookie: false,
                    url: hostUrl + goodSearch + "?sound=" + e.detail.value,
                    method: "GET",
                    success: function(res) {
                        var goods = res.data.content;
                        var keywords = [];

                        for (var i = 0; i < goods.length; i++) {
                            if (i > 4) {
                                break;
                            }
                            keywords.push(goods[i].goodname);
                        }

                        that.setData({
                            keywords: keywords
                        });
                    },
                    fail: function(res) {
                        console.log("search fail");
                    },
                    complete: function(res) {
                        console.log("search complete");
                    }
                };
                cookieRequest(requestInfo);

                timeId = setTimeout(() => {
                    this.setData({
                        showKeywords: true
                    })
                }, 1000)
            }
        }
    },
    keywordHandle(e) {
        const text = e.target.dataset.text;
        this.setData({
            userInput: text,
            showKeywords: false,
            showResult: true
        })
        this.historyHandle(text);

        var that = this;
        var requestInfo = {
            clearCookie: false,
            url: hostUrl + goodSearch + "?sound=" + text,
            method: "GET",
            success: function(res) {
                var goods = res.data.content;
                //     {
                //         id: 1,
                //         url: '../details/details?id=1',
                //         thumb: '/image/s4.png',
                //         title: '瓜子 100g',
                //         price: 0.01
                //     }, 
                var result = [];
                for (var i = 0; i < goods.length; i++) {
                    if (i > 6) {
                        break;
                    }
                    
                    var temp = {}
                    temp.id = goods[i].id
                    temp.url = "../details/details?id=" + goods[i].id.toString()
                    temp.thumb = hostUrl + imageUrl + "?id=" + goods[i].id.toString() + '0'
                    temp.title = goods[i].goodname
                    temp.price = goods[i].normalPrice
                    result.push(temp)
                }
                that.setData({
                    result: result
                })
            },
            fail: function(res) {
                console.log("search fail");
            },
            complete: function(res) {
                console.log("search complete");
            }
        };
        cookieRequest(requestInfo);
    },
    historyHandle(value) {
        let history = this.data.history;
        const idx = history.indexOf(value);
        if (idx === -1) {
            // 搜索记录只保留8个
            if (history.length > 7) {
                history.pop();
            }
        } else {
            history.splice(idx, 1);
        }
        history.unshift(value);
        wx.setStorageSync('history', JSON.stringify(history));
        this.setData({
            history
        });
    },
    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            //console.log(this.data.history);
        }
        //识别语音
        this.initRecord();
    },
    //识别语音 -- 初始化
    initRecord: function () {
        const that = this;
        // 有新的识别内容返回，则会调用此事件
        manager.onRecognize = function (res) {
            console.log(res)
        }
        // 正常开始录音识别时会调用此事件
        manager.onStart = function (res) {
            console.log("成功开始录音识别", res)
        }
        // 识别错误事件
        manager.onError = function (res) {
            console.error("error msg", res)
        }
        //识别结束事件
        manager.onStop = function (res) {
            console.log('..............结束录音')
            console.log('录音临时文件地址 -->' + res.tempFilePath); 
            console.log('录音总时长 -->' + res.duration + 'ms'); 
            console.log('文件大小 --> ' + res.fileSize + 'B');
            console.log('语音内容 --> ' + res.result);
            if (res.result == '') {
                wx.showModal({
                    title: '提示',
                    content: '听不清楚，请重新说一遍！',
                    showCancel: false,
                    success: function (res) {}
                })
                return;
            }
            var text = that.data.userInput + res.result;
            that.setData({
                userInput: text
            })
        }
    },
    //语音  --按住说话
    touchStart: function (e) {
        this.setData({
            recordState: true
        })
        // 语音开始识别
        manager.start({
            lang: 'zh_CN',// 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
        })
    },
    //语音  --松开结束
    touchEnd: function (e) {
        this.setData({
            recordState: false
        })
        // 语音结束识别
        manager.stop();
    }
})