package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import osfo.demo.entity.Userorder;

public interface orderRepo extends JpaRepository<Userorder,Integer> {

}
