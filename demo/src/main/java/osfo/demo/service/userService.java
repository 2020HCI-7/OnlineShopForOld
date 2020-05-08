package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.ConsumerDao;
import osfo.demo.entity.Consumer;

import java.util.List;

@Service
public class userService {
    @Autowired
    ConsumerDao consumerdao;
    public void testconsumer()
    {
        consumerdao.insertuser();

    }
    public List<Consumer> getalluser()
    {
        return consumerdao.getall();
    }
    public int register(String username,String password,String neck_name,String openid)
    {
        consumerdao.saveuser(username,password,neck_name,openid);
        return 0;
    }


}
