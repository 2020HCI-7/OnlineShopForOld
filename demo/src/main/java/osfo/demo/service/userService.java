package osfo.demo.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import osfo.demo.dao.*;
import osfo.demo.entity.*;
import osfo.demo.util.restapi.response;
import osfo.demo.util.wxauth.wxAuth;

import java.util.List;

@Service
public class userService {
    @Autowired
    ConsumerDao consumerdao;
    @Autowired
    userDao userdao;
    @Autowired
    dealerDao dealerdao;
    @Autowired
    discountDao discountdao;
    @Autowired
    addressDao adddao;
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
    public response register1(Dealer dealer)
    {
        dealerdao.savedealer(dealer);
        return new response(true,"",null);
    }
    public response editconsumer(Consumer consumer)
    {
        consumerdao.saveuser(consumer);
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
    public response getuserdiscount(Integer userid)
    {
        return new response(true,"",discountdao.getalldiscount(userid));
    }
    public response editdealer(Dealer dealer)
    {
        dealerdao.savedealer(dealer);
        return new response(true,"",null);
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
    public response getconsumerinfo(Integer id)
    {
        Consumer consumer = consumerdao.getconsumerbyid(id);
        if(consumer==null)
        {
            return new response(false,"no such user",null);
        }
        else
        {
            return new response(true,"",consumer);
        }

    }
    public response getuserinfo(Integer id)
    {
        User user = userdao.getuserbyid(id);
        if(user==null)
        {
            return new response(false,"no such user",null);
        }
        else
        {
            return new response(true,"",user);
        }

    }
    public response getaddressbyid(Integer id)
    {
        return new response(true,"",adddao.getaddressbyid(id));
    }


}
