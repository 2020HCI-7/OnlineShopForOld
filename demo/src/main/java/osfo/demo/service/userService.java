package osfo.demo.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import osfo.demo.dao.ConsumerDao;
import osfo.demo.dao.dealerDao;
import osfo.demo.dao.discountDao;
import osfo.demo.entity.*;
import osfo.demo.util.restapi.response;

import java.util.List;
import osfo.demo.util.restapi.wxauth.wxAuth;

@Service
public class userService {
    @Autowired
    ConsumerDao consumerdao;
    @Autowired
    dealerDao dealerdao;
    @Autowired
    discountDao discountdao;
    public List<Consumer> getalluser()
    {
        return consumerdao.getall();
    }
    public response register(Consumer consumer, String code)
    {
        String res = wxAuth.wxAuthCodeToSession(code);
        JSONObject jsonRes = new JSONObject(res);
        if(jsonRes.has("errcode") && (Integer)jsonRes.get("errcode") != 0) {
            return new response(false,"code error: " + jsonRes.getString("errmsg"),null);
        }

        String openid = jsonRes.getString("openid");
        consumer.setWexinOpenid(openid);
        consumerdao.saveuser(consumer);
        return new response(true,"",null);
    }
    public response edit(Consumer consumer)
    {
        consumerdao.saveuser(consumer);
        return new response(true,"",null);
    }
    public response register1(Dealer dealer)
    {
        dealerdao.savedealer(dealer);
        return new response(true,"",null);
    }
    public response addaddress(Address address)
    {

        return new response(true,"",consumerdao.addaddress(address));
    }
    public response getaddressbyuserid(Integer userid)
    {
        return new response(true,"",consumerdao.getalladdrbyuserid(userid));
    }
    public response useradddiscount(Integer userid, Discount discount)
    {
        UserDiscount tmp=new UserDiscount();
        tmp.setDiscountId(discount.getId());
        tmp.setUserId(userid);
        tmp.setJian(discount.getJian());
        tmp.setMan(discount.getMan());
        tmp.setStoreId(discount.getStoreId());
        return new response(true,"",discountdao.useradddiscount(tmp));
    }


}
