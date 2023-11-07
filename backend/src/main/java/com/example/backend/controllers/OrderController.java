package com.example.backend.controllers;

import com.example.backend.models.Order;
import com.example.backend.services.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/order")
public class OrderController {
    @Autowired
    private OrderServices orderServices;

    @GetMapping()
    public List<Order> getAllOrders() {
        return orderServices.findall();
    }

    @GetMapping("/date/{date}")
    public List<Order> getByDate(@PathVariable("date") Date date) {
        return orderServices.findOrdersByDate(date);
    }

}