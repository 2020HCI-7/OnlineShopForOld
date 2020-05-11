package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.ConsumerDao;
import osfo.demo.dao.dealerDao;
import osfo.demo.entity.Consumer;
import osfo.demo.util.restapi.response;

import java.util.List;

@Service
public class userService {
    @Autowired
    ConsumerDao consumerdao;
    @Autowired
    dealerDao dealerdao;
    public response testconsumer()
    {
        consumerdao.insertuser();
        return new response(true,"",null);

    }
    public List<Consumer> getalluser()
    {
        return consumerdao.getall();
    }
    public response register(String username,String password,String neck_name,String openid)
    {
        consumerdao.saveuser(username,password,neck_name,openid);
        return new response(true,"",null);
    }
    public response register1(String username,String password)
    {
        dealerdao.savedealer(username,password);
        return new response(true,"",null);
    }


}
