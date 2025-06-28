package com.farmcard.farmcard.controller;


import com.farmcard.farmcard.UserRepository.UserRepository;
import com.farmcard.farmcard.entity.Address;
import com.farmcard.farmcard.entity.User;
import com.farmcard.farmcard.UserRepository.AddressRepository;
import com.farmcard.farmcard.UserRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AddressController {

    @Autowired private AddressRepository addressRepo;
    @Autowired private UserRepository userRepo;

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addAddress(@PathVariable Long userId, @RequestBody Address address) {
        User user = userRepo.findById(userId).orElseThrow();
        address.setUser(user);
        return ResponseEntity.ok(addressRepo.save(address));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserAddresses(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        List<Address> addresses = addressRepo.findByUser(user);
        return ResponseEntity.ok(addresses);
    }

    @DeleteMapping("address/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        addressRepo.deleteById(id);
        return ResponseEntity.ok("Address deleted");
    }
}

