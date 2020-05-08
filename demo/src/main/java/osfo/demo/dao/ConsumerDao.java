package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.User;
import osfo.demo.repo.consumerRepo;
import osfo.demo.repo.userRepo;

import java.util.List;

@Repository
public class ConsumerDao {
    @Autowired
    consumerRepo consumerrepo;
    public Consumer getconsumerbyid(Integer id)
    {
        if(consumerrepo.findById(id).isPresent())
        {
            return consumerrepo.getOne(id);
        }
        return new Consumer();


    }
    public List<Consumer> getall()
    {
        return consumerrepo.findAll();
    }
    public void saveuser(String username,String password,String neckname,String openid)
    {
        Consumer consumer=new Consumer(username,password,neckname,openid);
        consumerrepo.save(consumer);

    }
    public void insertuser()
    {
        Consumer consumer=new Consumer();
        consumer.setNeck_name("shenruien");
        consumer.setPhonenumber("123456");
        consumer.setWexin_openid("123456");
        consumer.setPassword("123456");
        consumer.setStatus(1);
        consumer.setUsername("shenruien");

        consumerrepo.save(consumer);
    }
}
