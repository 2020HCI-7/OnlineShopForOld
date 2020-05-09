package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.storeDao;
import osfo.demo.entity.Store;

import java.util.List;

@Service
public class storeService {
    @Autowired
    storeDao storedao;
    public List<Store> getallstore()
    {
        return storedao.getallstore();
    }
    public void savestore(Integer dealerid,String address,String phone)
    {
        Store store=new Store();
        store.setAddress(address);
        store.setPhonenumber(phone);
        store.setDealerid(dealerid);
        storedao.savestore(store);
    }
}
