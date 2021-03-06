package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Store;
import osfo.demo.repo.storeRepo;

import java.util.List;
import java.util.Optional;

@Repository
public class storeDao {
    @Autowired
    storeRepo storerepo;
    public List<Store> getallstore()
    {
        return storerepo.findAll();
    }
    public List<Store> getstorebydealerid(Integer id){return storerepo.getstorebydealerid(id);}
    public void savestore(Store store){storerepo.save(store);}
    public Optional<Store> getstorebystoreid(Integer id){return storerepo.findById(id);}

}
