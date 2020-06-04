package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.User;

import java.util.List;

@Repository
public interface consumerRepo extends JpaRepository<Consumer,Integer> {
    Iterable<Consumer> findAllByWexinOpenid(String openid);
}
