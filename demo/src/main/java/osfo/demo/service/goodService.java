package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.goodDao;
import osfo.demo.dao.storeDao;
import osfo.demo.entity.Goods;

import java.util.List;

@Service
public class goodService {
    @Autowired
    goodDao gooddao;
    @Autowired
    storeDao storedao;
    public List<Goods> getgoodsbydealerid(Integer id)
    {
        return gooddao.getgoodsbydealerid(id);
    }
    public List<Goods> getallgoods()
    {
        return gooddao.getallgood();
    }
    public void addgood(Integer dealerid,float nprice,float lprice,String name,String des,float storage)
    {
        Goods good=new Goods();
        good.setGoodname(name);
        good.setDescription(des);
        good.setLeast_price(lprice);
        good.setNormal_price(nprice);
        good.setStorage(storage);
        good.setStore(storedao.getstorebyid(dealerid).get());
        gooddao.savegood(good);
    }

}
