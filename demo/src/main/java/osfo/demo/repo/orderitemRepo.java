package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import osfo.demo.entity.OrderItem;
import osfo.demo.entity.Userorder;

import java.util.List;

public interface orderitemRepo extends JpaRepository<OrderItem,Integer> {
    @Query("SELECT b from OrderItem b where b.userorder.id=?1")
    List<OrderItem> getOrderItemsByorOrderById(Integer orderid);
}
