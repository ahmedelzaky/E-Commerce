package com.example.backend.services;

import com.example.backend.enums.OrderStatus;
import com.example.backend.models.OrderItem;
import com.example.backend.models.Payment;
import com.example.backend.models.Product;
import com.example.backend.repositorys.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentServices {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductServices productServices;

    public List<Payment> getPayment() {
        return paymentRepository.findAll();
    }

    private void CheckProductsQuantity(List<OrderItem> orderItems) {
        for (OrderItem item : orderItems) {

            Product product = productServices.getProduct(item.getProductId());

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new IllegalStateException("There is no enough stock of " + product.getTitle());
            }
        }
    }

    private void editProductsStockQuantity(List<OrderItem> orderItems) {
        for (OrderItem item : orderItems) {
            productServices.editStockQuantity(item.getProductId(), item.getQuantity());
        }
    }

    public void pay(Payment payment) {
        CheckProductsQuantity(payment.getOrder().getOrderItems());

        editProductsStockQuantity(payment.getOrder().getOrderItems());

        payment.getOrder().setStatus(OrderStatus.PENDING);

        paymentRepository.save(payment);
    }

    public List<Payment> getPaymentByCustomerId(long id) {
        return paymentRepository.findPaymentByCustomerId(id);
    }

    public List<Payment> getPaymentByDate(LocalDate date) {
        return paymentRepository.findPaymentByDate(date);
    }

    public Double getEarnings() {
        return paymentRepository.getEarnings();
    }

    public Double getEarningsToday() {
        return paymentRepository.getEarningsToday();
    }
}
