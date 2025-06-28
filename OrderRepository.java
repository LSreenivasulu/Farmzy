package com.farmcard.farmcard.UserRepository;

import com.farmcard.farmcard.entity.Order;
import com.farmcard.farmcard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}

