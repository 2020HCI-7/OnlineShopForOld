package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Store;
import osfo.demo.repo.storeRepo;

import java.util.List;

@Repository
public class storeDao {
    @Autowired
    storeRepo storerepo;
    public List<Store> getallstore()
    {
        return storerepo.findAll();
    }
}
