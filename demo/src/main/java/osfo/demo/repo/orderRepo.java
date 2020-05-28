package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import osfo.demo.entity.Goods;
import osfo.demo.entity.Userorder;

import java.util.List;

public interface orderRepo extends JpaRepository<Userorder,Integer> {
    Iterable<Userorder> findAllByStoreId(Integer id);
    Iterable<Userorder> findAllByUserId(Integer id);

}
