package com.example.backend.controllers;

import com.example.backend.dto.OrderDetailsDTO;
import com.example.backend.dto.OrderDto;
import com.example.backend.enums.OrderStatus;
import com.example.backend.models.Order;
import com.example.backend.services.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/orders")

public class OrderController {
    @Autowired
    private OrderServices orderServices;

    @GetMapping()
    public List<Order> getOrders() {
        return orderServices.findAll();
    }

    @GetMapping("/orders-count/{status}")
    public Long getOrdersCount(@PathVariable("status") OrderStatus status) {
        return orderServices.getOrdersCount(status);
    }

    @GetMapping("/get-order-by-date/{date}")
    public List<Order> getByDate(@PathVariable("date") LocalDate date) {
        return orderServices.findOrdersByDate(date);
    }

    @GetMapping("/customer/{id}")
    public List<Order> getOrderByCustomerId(@PathVariable("id") Long id) {
        return orderServices.getOrderByCustomerId(id);
    }

    @GetMapping("get-orders-by-status/{status}")
    public List<OrderDto> getOrdersByStatus(@PathVariable("status") OrderStatus status) {
        return orderServices.getOrdersByStatus(status);
    }

    @GetMapping("/get-order-details-by-id/{id}")
    public OrderDetailsDTO getOrderDetailsById(@PathVariable("id") Long id) {
        return orderServices.getOrderDetailsById(id);
    }

    @GetMapping("/get-order-details-by-customer-id/{id}")
    public List<OrderDetailsDTO> getOrderDetailsByCustomerId(@PathVariable("id") Long id) {
        return orderServices.getOrderDetailsByCustomerId(id);
    }

    @PutMapping("/update-order-status/{id}")
    public void updateOrderStatus(@PathVariable("id") Long id, @RequestParam OrderStatus status) {
        orderServices.updateOrderStatus(id, status);
    }

}