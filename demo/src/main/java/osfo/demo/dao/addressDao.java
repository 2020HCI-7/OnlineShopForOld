package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Address;
import osfo.demo.repo.addressRepo;

import java.util.Optional;

@Repository
public class addressDao {
    @Autowired
    addressRepo addrepo;
    public Address getaddressbyid(Integer id)
    {
        Optional<Address> byId = addrepo.findById(id);
        return byId.orElse(null);
    }
}
