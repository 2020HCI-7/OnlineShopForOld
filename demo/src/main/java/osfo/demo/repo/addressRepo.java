package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import osfo.demo.entity.Address;

public interface addressRepo extends JpaRepository<Address,Integer> {
    Iterable<Address> findAllByUserId(Integer userid);
}
