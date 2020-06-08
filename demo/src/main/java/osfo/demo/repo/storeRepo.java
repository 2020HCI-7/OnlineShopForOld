package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Goods;
import osfo.demo.entity.Store;

import java.util.List;

@Repository
public interface storeRepo extends JpaRepository<Store,Integer> {
    @Query("SELECT b from Store b where b.dealer.id=?1")
    List<Store> getstorebydealerid(Integer dealerid);
}
