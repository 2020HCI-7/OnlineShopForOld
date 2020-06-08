package com.oauth.demo.repo;

import com.oauth.demo.entity.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface consumerRepo extends JpaRepository<Consumer,Integer> {
}
