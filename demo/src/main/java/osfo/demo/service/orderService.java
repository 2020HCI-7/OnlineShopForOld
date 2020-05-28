package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.orderDao;
import osfo.demo.dao.storeDao;
import osfo.demo.entity.Userorder;
import osfo.demo.util.restapi.response;

@Service
public class orderService {
    @Autowired
    orderDao orderdao;
    @Autowired
    storeDao storedao;
    public Object editorder(Userorder order)
    {
        return new response(true,null,orderdao.saveorder(order));
    }
    public Object getorderbyuserid(Integer id)
    {
        return new response(true,null,orderdao.getorderbyuserid(id));
    }
    public Object getorderbydealerid(Integer id)
    {

        return new response(true,null,storedao.getstorebydealerid(id).get(0).getId());
    }
    public Object getorderitems(Integer id)
    {
        return new response(true,null,orderdao.getorderitem(id));
    }
    public Object getorderbyid(Integer id)
    {

        return new response(true,null,orderdao.getorderbyid(id));
    }

}
