package com.example.backend.controllers;

import com.example.backend.models.Order;
import com.example.backend.services.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/orders")

public class OrderController {
    @Autowired
    private OrderServices orderServices;

    @GetMapping()
    public List<Order> getOrders() {
        return orderServices.findAll();
    }

    @GetMapping("/get-order-by-date/{date}")
    public List<Order> getByDate(@PathVariable("date") LocalDate date) {
        return orderServices.findOrdersByDate(date);
    }

    @GetMapping("/customer/{id}")
    public List<Order> getOrderByCustomerId(@PathVariable("id") Long id) {
        return orderServices.getOrderByCustomerId(id);
    }

}