package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.dealerDao;
import osfo.demo.dao.discountDao;
import osfo.demo.dao.storeDao;
import osfo.demo.entity.Discount;
import osfo.demo.entity.Store;
import osfo.demo.util.restapi.response;

import java.util.List;

@Service
public class storeService {
    @Autowired
    storeDao storedao;
    @Autowired
    dealerDao dealerdao;
    @Autowired
    discountDao discountdao;
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
    public response save(Store store)
    {

        storedao.savestore(store);
        return new response(true,"",null);
    }
    public response getstorebystoreid(Integer id)
    {
        if(storedao.getstorebystoreid(id).isPresent())
        {
            return new response(true,"",storedao.getstorebystoreid(id).get());
        }
        else
        {
            return new response(false,"no matching store",null);
        }

    }
    public response getstorebydealerid(Integer id)
    {
        return new response(true,"",storedao.getstorebydealerid(id));
    }
    public response adddiscount(Discount discount)
    {
        return new response(true,"",discountdao.adddiscount(discount));
    }
    public response deletediscount(Discount discount)
    {
        discountdao.deletediscount(discount);
        return new response(true,"",null);
    }
}
