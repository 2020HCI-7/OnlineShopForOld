package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import osfo.demo.entity.Goods;
import osfo.demo.entity.User;

import java.util.List;

public interface   goodRepo extends JpaRepository<Goods,Integer> {
    @Query("SELECT b from Goods b where b.store.dealerid=?1")
    List<Goods> getgoodsbydealerid(Integer dealerid);
}
