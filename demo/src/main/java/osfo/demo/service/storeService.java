package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.dealerDao;
import osfo.demo.dao.storeDao;
import osfo.demo.entity.Store;
import osfo.demo.util.restapi.response;

import java.util.List;

@Service
public class storeService {
    @Autowired
    storeDao storedao;
    @Autowired
    dealerDao dealerdao;
    public response getallstore()
    {

        return new response(true,"",storedao.getallstore());
    }
    public response savestore(Integer dealerid,String address,String phone)
    {
        Store store=new Store();
        store.setAddress(address);
        store.setPhonenumber(phone);

        store.setDealer(dealerdao.getdealerbyid(dealerid).get());
        storedao.savestore(store);
        return new response(true,"",null);
    }
    public response getstorebydealerid(Integer id)
    {
        return new response(true,"",storedao.getstorebyid(id));
    }
}
