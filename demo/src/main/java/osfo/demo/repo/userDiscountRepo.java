package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import osfo.demo.entity.UserDiscount;

import java.util.Collection;
import java.util.List;

public interface userDiscountRepo extends JpaRepository<UserDiscount,Integer> {
    Iterable<UserDiscount> findAllByUserId(Integer userid);
    void deleteAllByDiscountId(Integer id);
    List<UserDiscount> findAllByIdIn(Collection<Integer> ids);
}
