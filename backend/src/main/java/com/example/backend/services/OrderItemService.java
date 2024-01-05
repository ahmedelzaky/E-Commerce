package com.example.backend.services;

import com.example.backend.dto.CartDto;
import com.example.backend.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<CartDto> getCart(Long id) {
        return orderItemRepository.getCart(id);
    }
}
