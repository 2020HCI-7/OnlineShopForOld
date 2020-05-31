package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.goodDao;
import osfo.demo.dao.storeDao;
import osfo.demo.entity.Goods;
import osfo.demo.util.restapi.response;

import java.util.List;

@Service
public class goodService {
    @Autowired
    goodDao gooddao;
    @Autowired
    storeDao storedao;
    public Object getgoodsbystoreid(Integer id)
    {


        return new response(true,"",gooddao.getgoodsbystorerid(id));
    }
    public response getallgoods()
    {

        return new response(true,"",gooddao.getallgood());
    }
    public Object addgood(Integer dealerid,Goods good)
    {

        good.setStoreId(storedao.getstorebydealerid(dealerid).get(0).getId());
        gooddao.savegood(good);
        return new response(true,"",null);
    }
    public Object getgoodsbyname(String name)
    {
        return new response(true,"",gooddao.getgoodsbyname(name));
    }

}
