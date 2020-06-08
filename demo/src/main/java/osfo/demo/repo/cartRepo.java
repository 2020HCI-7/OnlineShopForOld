package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import osfo.demo.entity.Cart;

import java.util.List;

public interface cartRepo extends JpaRepository<Cart,Integer> {
    Iterable<Cart> findAllByUserId(Integer userid);
}
