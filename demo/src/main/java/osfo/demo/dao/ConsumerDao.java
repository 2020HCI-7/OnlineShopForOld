package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Address;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.User;
import osfo.demo.repo.addressRepo;
import osfo.demo.repo.consumerRepo;
import osfo.demo.repo.userRepo;

import java.util.List;

@Repository
public class ConsumerDao {
    @Autowired
    consumerRepo consumerrepo;
    @Autowired
    userRepo userrepo;
    @Autowired
    addressRepo addressrepo;
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
    public Consumer saveuser(Consumer consumer)
    {

        return consumerrepo.save(consumer);

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
    public Address addaddress(Address address)
    {

        return addressrepo.save(address);
    }
    public Iterable<Address> getalladdrbyuserid(Integer userid)
    {
        return addressrepo.findAllByUserId(userid);
    }
}
