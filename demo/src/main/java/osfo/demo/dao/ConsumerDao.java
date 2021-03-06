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
        return null;


    }
    public List<Consumer> getall()
    {
        return consumerrepo.findAll();
    }
    public Consumer saveuser(Consumer consumer)
    {

        return consumerrepo.save(consumer);

    }
    public List<Consumer> getconsumerbyopenid(String openid)
    {
        return consumerrepo.getAllByWexinOpenid(openid);
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
