package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.User;

import java.util.List;

@Repository
public interface consumerRepo extends JpaRepository<Consumer,Integer> {
    @Query(value = "SELECT * from user where wexin_openid=?1", nativeQuery = true)
    List<Consumer> getConsumerByWexinOpenid(String openid);
}
