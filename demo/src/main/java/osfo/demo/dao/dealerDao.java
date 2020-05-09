package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.Dealer;
import osfo.demo.repo.consumerRepo;
import osfo.demo.repo.dealerRepo;

import java.util.List;
import java.util.Optional;

@Repository
public class dealerDao {
    @Autowired
    dealerRepo dealerrepo;
    public Optional<Dealer> getdealerbyid(Integer id)
    {
        return dealerrepo.findById(id);


    }
    public List<Dealer> getall()
    {
        return dealerrepo.findAll();
    }
    public void savedealer(String username,String password)
    {
        Dealer dealer=new Dealer(username,password);
        dealerrepo.save(dealer);

    }

}