package com.farmcard.farmcard.UserRepository;


import com.farmcard.farmcard.entity.Address;
import com.farmcard.farmcard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
}

