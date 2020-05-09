package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import osfo.demo.entity.Dealer;

public interface dealerRepo extends JpaRepository<Dealer,Integer> {
}
