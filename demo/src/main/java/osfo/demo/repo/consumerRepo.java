package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Consumer;

import java.util.List;

@Repository
public interface consumerRepo extends JpaRepository<Consumer,Integer> {
    List<Consumer> getAllByWexinOpenid(String opendid);
}
