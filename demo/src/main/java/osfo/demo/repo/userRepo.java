package osfo.demo.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.User;

import javax.transaction.Transactional;
import java.util.List;
@Repository
public interface userRepo extends JpaRepository<User, Integer>{
    @Query("SELECT b from User b where b.username=?1")
    List<User> getuserbyusername(String username);


}
