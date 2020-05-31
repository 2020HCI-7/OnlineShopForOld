package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import osfo.demo.entity.Discount;

import java.util.Collection;

public interface discountRepo extends JpaRepository<Discount,Integer> {
    Iterable<Discount> findAllByStoreId(Integer storeid);


}
