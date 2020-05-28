package osfo.demo.dao;

import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.OrderItem;
import osfo.demo.entity.Userorder;
import osfo.demo.repo.orderRepo;
import osfo.demo.repo.orderitemRepo;

import java.util.List;
import java.util.Optional;

@Repository
public class orderDao {
    @Autowired
    orderRepo orderrepo;
    @Autowired
    orderitemRepo orderitemrepo;
    public Iterable<Userorder> getorderbyuserid(Integer id)
    {
        return orderrepo.findAllByUserId(id);
    }
    public Iterable<Userorder> getorderbystoreid(Integer id)
    {
        return orderrepo.findAllByStoreId(id);
    }
    public Optional<Userorder> getorderbyid(Integer id){return orderrepo.findById(id);}
    public Iterable<OrderItem> getorderitem(Integer id)
    {
        return orderitemrepo.getOrderItemsByUserorderId(id);
    }
    public Userorder saveorder(Userorder order)
    {
        return orderrepo.save(order);
    }
    public OrderItem saveorderitem(OrderItem orderitem)
    {
        return orderitemrepo.save(orderitem);
    }

}
