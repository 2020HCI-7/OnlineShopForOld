package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.ConsumerDao;
import osfo.demo.dao.dealerDao;
import osfo.demo.entity.Address;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.Dealer;
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


}
