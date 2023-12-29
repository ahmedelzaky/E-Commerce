package com.example.backend.services;

import com.example.backend.dto.CustomerDto;
import com.example.backend.dto.OrderDetailsDTO;
import com.example.backend.enums.OrderStatus;
import com.example.backend.models.Order;
import com.example.backend.repositorys.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service

public class OrderServices {
    @Autowired
    private OrderRepository repository;

    @Autowired
    private ProductServices productServices;
    @Autowired
    private EmailService emailService;

    @Autowired
    private CustomerServices CustomerServices;


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
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new IllegalStateException("this order is already cancelled");
        }
        if (order.getStatus() == OrderStatus.COMPLETED) {
            throw new IllegalStateException("this order is already delivered");
        }
        if (status == OrderStatus.CANCELLED) {
            order.getOrderItems().forEach(orderItem -> {
                productServices.editStockQuantity(orderItem.getProductId(), orderItem.getQuantity(), true);
            });
            CustomerDto customer = CustomerServices.getCustomerById(order.getCustomerId());
            emailService.sendEmail(customer.getEmail(), "Order is cancelled", createOrderCancelledEmail(order, customer));

        }
        order.setStatus(status);
    }

    private String createOrderCancelledEmail(Order order, CustomerDto customer) {
        return "Dear " + customer.getFirstName() + " " + customer.getLastName() + "\n" +
                "Your order is cancelled\n" +
                "Order id: " + order.getId() + "\n" +
                "Order date: " + order.getOrderDate() + "\n" +
                "Order status: " + order.getStatus() + "\n" +
                "Thank you for shopping with us";
    }


    public Long getOrdersCount(OrderStatus status) {
        return repository.countOrdersByStatus(status);
    }

    public List<Order> getOrdersByStatus(OrderStatus status) {
        return repository.findOrdersByStatus(status);
    }

    public OrderDetailsDTO getOrderDetailsById(Long id) {
        return repository.findOrderDetails(id).orElseThrow(() -> new IllegalStateException("this order dose not exist"));
    }

    public List<OrderDetailsDTO> getOrderDetailsByCustomerId(Long id) {
        return repository.findOrderDetailsByCustomerId(id);
    }
}
