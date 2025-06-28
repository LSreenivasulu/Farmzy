package com.farmcard.farmcard.controller;

import com.farmcard.farmcard.entity.*;
import com.farmcard.farmcard.UserRepository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController

@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired private OrderRepository orderRepo;
    @Autowired private OrderItemRepository itemRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired private AddressRepository addressRepo;

    @PostMapping(value = "/create/{userId}", consumes = "application/json")
    public ResponseEntity<?> createOrder(@PathVariable Long userId, @RequestBody Address address) {
        User user = userRepo.findById(userId).orElseThrow();
        Address savedAddress = addressRepo.save(address);
        Order order = new Order();
        order.setUser(user);
        order.setAddress(savedAddress);
        return ResponseEntity.ok(orderRepo.save(order));
    }

    @PostMapping("/{orderId}/add/{productId}")
    public ResponseEntity<?> addItem(@PathVariable Long orderId, @PathVariable Long productId, @RequestParam int qty) {
        Order order = orderRepo.findById(orderId).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();

        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setProduct(product);
        item.setQuantity(qty);

        return ResponseEntity.ok(itemRepo.save(item));
    }

    @DeleteMapping("/order/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        Order order = orderRepo.findById(id).orElseThrow();

        // Delete associated order items first
        List<OrderItem> items = itemRepo.findByOrder(order);
        itemRepo.deleteAll(items);

        // Then delete the order
        orderRepo.deleteById(id);

        return ResponseEntity.ok().build();
    }


    @GetMapping("/user/{userId}/history")
    public ResponseEntity<?> getOrderHistory(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        List<Order> orders = orderRepo.findByUser(user);

        List<Map<String, Object>> history = new ArrayList<>();
        for (Order order : orders) {
            Map<String, Object> orderData = new HashMap<>();
            orderData.put("orderId", order.getId());
            orderData.put("orderDate", order.getOrderDate());
            orderData.put("status", order.getStatus());

            // Include address info
            Address address = order.getAddress();
            if (address != null) {
                Map<String, Object> addrMap = new HashMap<>();
                addrMap.put("street", address.getStreet());
                addrMap.put("city", address.getCity());
                addrMap.put("state", address.getState());
                orderData.put("address", addrMap);
            }

            List<OrderItem> items = itemRepo.findByOrder(order);
            List<Map<String, Object>> itemList = new ArrayList<>();

            for (OrderItem item : items) {
                Map<String, Object> productData = new HashMap<>();
                productData.put("productName", item.getProduct().getName());
                productData.put("quantity", item.getQuantity());
                productData.put("price", item.getProduct().getPrice());
                itemList.add(productData);
            }

            orderData.put("items", itemList);
            history.add(orderData);
        }

        return ResponseEntity.ok(history);
    }

}
