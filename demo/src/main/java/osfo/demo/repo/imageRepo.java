package osfo.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import osfo.demo.entity.Image;

public interface imageRepo  extends JpaRepository<Image,Integer> {
}
