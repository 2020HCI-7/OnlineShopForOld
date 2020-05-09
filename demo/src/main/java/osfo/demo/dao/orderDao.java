package osfo.demo.dao;

import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.OrderItem;
import osfo.demo.entity.Userorder;
import osfo.demo.repo.orderRepo;
import osfo.demo.repo.orderitemRepo;

import java.util.List;

@Repository
public class orderDao {
    @Autowired
    orderRepo orderrepo;
    @Autowired
    orderitemRepo orderitemrepo;
    public List<Userorder> getorderbyuserid(Integer id)
    {
        return orderrepo.getgoodsbydealerid(id);
    }
    public List<OrderItem> getorderitem(Integer id)
    {
        return orderitemrepo.getOrderItemsByorOrderById(id);
    }
}
