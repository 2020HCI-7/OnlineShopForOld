package osfo.demo.util.restapi.wxauth;

import osfo.demo.util.restapi.common.httpClient;

public class wxAuth {

    // 返回从微信服务器得到的相应体字符串
    public static String wxAuthCodeToSession(String code) {
        //后期改到配置文件里面
        String appid = "wx9632b848f112f1c3";
        String appSecret = "24672839bdea27318d651bba11d795c0";
        String grant_type = "authorization_code";
        String wxAuthUrl = "https://api.weixin.qq.com/sns/jscode2session";

        String requestUrl = wxAuthUrl
                + "?appid=" + appid
                + "&secret=" + appSecret
                + "&js_code=" + code
                + "&grant_type=" + grant_type;
        String res = httpClient.doGet(requestUrl);

        return res;
    }
}
