package com.example.backend.controllers;

import com.example.backend.dto.CartDto;
import com.example.backend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/cart")
public class OrderItemController {
    @Autowired
    private OrderItemService orderItemService;

    @GetMapping("/{id}")
    public List<CartDto> getCart(@PathVariable("id") Long id) {
        return orderItemService.getCart(id);
    }
}
