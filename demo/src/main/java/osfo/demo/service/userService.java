package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.ConsumerDao;
import osfo.demo.dao.dealerDao;
import osfo.demo.dao.discountDao;
import osfo.demo.entity.*;
import osfo.demo.util.restapi.response;

import java.util.List;

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
    public response register(Consumer consumer)
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
    public response getconsumerbyopenid(String openid)
    {
        return new response(true,"",consumerdao.getbyopenid(openid));
    }
    public response getconsumerinfo(Integer id)
    {
        return new response(true,"",consumerdao.getconsumerbyid(id));
    }


}
