package com.farmcard.farmcard.UserRepository;

import com.farmcard.farmcard.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}

