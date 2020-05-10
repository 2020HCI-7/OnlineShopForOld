package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.User;
import osfo.demo.repo.consumerRepo;
import osfo.demo.repo.userRepo;

import java.util.List;
import java.util.Optional;

@Repository
public class userDao {
    @Autowired
    userRepo userrepo;
    public Optional<User> getuserbyid(Integer id)
    {
        return userrepo.findById(id);


    }
    public List<User> getall()
    {
        return userrepo.findAll();
    }
    public List<User> getbyusername(String username)
    {
        return userrepo.getuserbyusername(username);
    }

}
