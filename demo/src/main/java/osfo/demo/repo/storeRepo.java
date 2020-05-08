package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Store;
@Repository
public interface storeRepo extends JpaRepository<Store,Integer> {
}
