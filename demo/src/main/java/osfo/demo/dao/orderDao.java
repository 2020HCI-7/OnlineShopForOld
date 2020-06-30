package osfo.demo.dao;

import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.*;
import osfo.demo.repo.addressRepo;
import osfo.demo.repo.goodRepo;
import osfo.demo.repo.orderRepo;
import osfo.demo.repo.orderitemRepo;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Repository
public class orderDao {
    @Autowired
    orderRepo orderrepo;
    @Autowired
    orderitemRepo orderitemrepo;
    @Autowired
    goodRepo goodrepo;
    @Autowired
    addressRepo addrepo;
    public List<orderutil> getorderbyuserid(Integer id)
    {
        List<orderutil> result=new LinkedList<orderutil>();
        for(Userorder uo: orderrepo.findAllByUserId(id))
        {
            orderutil tmp=new orderutil();
            tmp.order=uo;
            List<OrderItem> tmpi=new LinkedList<OrderItem>();
            List<Goods> tmpg=new LinkedList<Goods>();
            for(OrderItem oi:getorderitem(uo.id))
            {
                tmpi.add(oi);
                Optional<Goods> tmpo=goodrepo.findById(oi.getGoodId());
                if(tmpo.isPresent())
                {
                    tmpg.add(tmpo.get());
                }

            }
            Optional<Address> address = addrepo.findById(uo.getAddressId());
            if(address.isPresent())
            {
                tmp.address=address.get();
            }
            tmp.goods=tmpg;
            tmp.items=tmpi;
            result.add(tmp);
        }
        return result;

    }
    public List<orderutil> getorderbystoreid(Integer id)
    {
        List<orderutil> result=new LinkedList<orderutil>();
        for(Userorder uo: orderrepo.findAllByStoreId(id))
        {
            orderutil tmp=new orderutil();
            tmp.order=uo;
            List<OrderItem> tmpi=new LinkedList<OrderItem>();
            List<Goods> tmpg=new LinkedList<Goods>();
            for(OrderItem oi:getorderitem(uo.id))
            {
                tmpi.add(oi);
                Optional<Goods> tmpo=goodrepo.findById(oi.getGoodId());
                if(tmpo.isPresent())
                {
                    tmpg.add(tmpo.get());
                }

            }
            Optional<Address> address = addrepo.findById(uo.getAddressId());
            if(address.isPresent())
            {
                tmp.address=address.get();
            }
            tmp.goods=tmpg;
            tmp.items=tmpi;

            result.add(tmp);
        }
        return result;
    }
    public Userorder getorderbyid(Integer id)
    {
        return orderrepo.findById(id).orElse(null);



    }
    public Iterable<OrderItem> getorderitem(Integer id)
    {
        return orderitemrepo.getOrderItemsByUserorderId(id);
    }
    public Userorder saveorder(Userorder order)
    {
        Userorder tmp= orderrepo.save(order);
        orderrepo.flush();
        return tmp;
    }
    public OrderItem saveorderitem(OrderItem orderitem)
    {
        return orderitemrepo.save(orderitem);
    }

}
