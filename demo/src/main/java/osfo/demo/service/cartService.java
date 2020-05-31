package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.dao.cartDao;
import osfo.demo.dao.discountDao;
import osfo.demo.dao.goodDao;
import osfo.demo.dao.orderDao;
import osfo.demo.entity.*;
import osfo.demo.util.restapi.response;

import java.util.*;

@Service
public class cartService {
    @Autowired
    cartDao cartdao;
    @Autowired
    orderDao orderdao;
    @Autowired
    goodDao gooddao;
    @Autowired
    discountDao discountdao;
    public Object addtocart(Cart cart)
    {
        return new response(true,null,cartdao.save(cart));
    }
    public Object getmycart(Integer userid)
    {
        return new response(true,null,cartdao.getallbyuserid(userid));
    }
    public Object cleancart(Integer userid, cleancart info)
    {
        Iterable<Cart> carts =cartdao.getallbyuserid(userid);
        Map<Integer,LinkedList<Cart>> orders=new HashMap<Integer,LinkedList<Cart>>();
        for(Cart cart:carts)
        {
            Goods good=gooddao.getgoodbyid(cart.goodId).get();
            if(info.cartIds.contains(cart.id))
            {
                if(orders.containsKey(good.getStoreId()))
                {
                    orders.get(good.getStoreId()).add(cart);
                }
                else
                {
                    orders.put(good.getStoreId(),new LinkedList<Cart>());

                    orders.get(good.getStoreId()).add(cart);
                }
                cartdao.delete(cart.id);
            }

        }
        List<UserDiscount> discounts=discountdao.getallbyid(info.discountIds);

        for(Map.Entry<Integer,LinkedList<Cart>> entry:orders.entrySet())
        {
            Integer storeid=entry.getKey();
            Userorder order=new Userorder();
            order.setStoreId(storeid);
            order.setUserId(userid);
            order.setAddressId(info.addressId);
            order.setDate(new Date());
            order.setStatus(0);
            order=orderdao.saveorder(order);
            float money=0.0f;
            for(Cart cart:entry.getValue())
            {
                OrderItem item=new OrderItem();
                item.setNumber(cart.getNumber());
                item.setGoodId(cart.getGoodId());
                item.setUserorderId(order.getId());
                orderdao.saveorderitem(item);
                Goods good=gooddao.getgoodbyid(cart.goodId).get();
                System.out.println(cart.goodId);
                money+=good.getLeastPrice()*cart.getNumber();
                System.out.println(cart.goodId);
            }
            float finalmoney=money;
            System.out.println(finalmoney);
            for(UserDiscount tmp:discounts)
            {
                if(tmp.getStoreId()==storeid)
                {
                    if(tmp.getMan()<=finalmoney)
                    {
                        finalmoney-=tmp.getJian();
                        discountdao.deleteuserdiscount(tmp);
                        break;
                    }
                }
            }
            order.setMoney(money);
            order.setFinalmoney(finalmoney);
            orderdao.saveorder(order);
        }
        return new response(true,null,null );
    }
    public Object removecart(Integer cartid)
    {
        cartdao.delete(cartid);
        return new response(true,null,null );
    }
    public Object editcat(Cart cart)
    {
        return new response(true,null,cartdao.save(cart));
    }

}
