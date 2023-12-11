package com.example.backend.services;

import com.example.backend.enums.OrderStatus;
import com.example.backend.models.Order;
import com.example.backend.repositorys.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public class OrderServices {
    @Autowired
    private OrderRepository repository;


    public List<Order> findOrdersByDate(LocalDate date) {
        return repository.findOrdersByDate(date);

    }

    public List<Order> findAll() {
        return repository.findAll();
    }

    public List<Order> getOrderByCustomerId(long id) {
        return repository.findOrderByCustomerId(id);
    }

    @Transactional
    public void updateOrderStatus(Long id, OrderStatus status) {
        Order order = repository.findById(id).orElseThrow(() -> new IllegalStateException("this order dose not exist"));
        order.setStatus(status);
    }

    public List<Order> getPendingOrders() {
        return repository.findPendingOrders();
    }

    public List<Order> getInProgressOrders() {
        return repository.findInProgressOrders();
    }

    public List<Order> getDeliveredOrders() {
        return repository.findDeliveredOrders();
    }

    public Long getOrdersCount(OrderStatus status) {
        return repository.countOrdersByStatus(status);
    }
}
