package com.example.backend.controllers;

import com.example.backend.models.Order;
import com.example.backend.services.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/order")

public class OrderController {
    @Autowired
    private OrderServices orderServices;
    @PostMapping("/Requestorder")
    public String sendorder (@RequestBody Order order){
        orderServices.addorder(order);
        return "order is sent";
    }
    @GetMapping("/all-orders")
    public List<Order> findallorders(){
        return orderServices.findall();
    }
    @GetMapping("/getorderbydate/{date}")
    public List<Order> getbydate(@PathVariable("date") Date date){
        return orderServices.findOrdersByDate(date);
    }
    @DeleteMapping("/delete/{id}")
    public void deletebyid(@PathVariable Long id){
        orderServices.deletebyid(id);
}
}