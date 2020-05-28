package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.dao.cartDao;
import osfo.demo.dao.goodDao;
import osfo.demo.dao.orderDao;
import osfo.demo.entity.Cart;
import osfo.demo.entity.Goods;
import osfo.demo.entity.OrderItem;
import osfo.demo.entity.Userorder;
import osfo.demo.util.restapi.response;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

@Service
public class cartService {
    @Autowired
    cartDao cartdao;
    @Autowired
    orderDao orderdao;
    @Autowired
    goodDao gooddao;
    public Object addtocart(Cart cart)
    {
        return new response(true,null,cartdao.save(cart));
    }
    public Object getmycart(Integer userid)
    {
        return new response(true,null,cartdao.getallbyuserid(userid));
    }
    public Object cleancart(Integer userid,Integer addressid)
    {
        Iterable<Cart> carts =cartdao.getallbyuserid(userid);
        Map<Integer,LinkedList<Cart>> orders=new HashMap<Integer,LinkedList<Cart>>();
        for(Cart cart:carts)
        {
            Goods good=gooddao.getgoodbyid(cart.goodId).get();
            if(orders.containsKey(good.getStoreId()))
            {
                orders.get(good.getStoreId()).add(cart);
            }
            else
            {
                orders.put(good.getStoreId(),new LinkedList<Cart>());

                orders.get(good.getStoreId()).add(cart);
            }
        }
        for(Map.Entry<Integer,LinkedList<Cart>> entry:orders.entrySet())
        {
            Integer storeid=entry.getKey();
            Userorder order=new Userorder();
            order.setStoreId(storeid);
            order.setUserId(userid);
            order.setAddressId(addressid);
            order.setDate(new Date());
            order.setStatus(0);
            order=orderdao.saveorder(order);
            for(Cart cart:entry.getValue())
            {
                OrderItem item=new OrderItem();
                item.setNumber(cart.getNumber());
                item.setGoodId(cart.getGoodId());
                item.setUserorderId(order.getId());
                orderdao.saveorderitem(item);
            }
        }
        return new response(true,null,null );
    }


}
