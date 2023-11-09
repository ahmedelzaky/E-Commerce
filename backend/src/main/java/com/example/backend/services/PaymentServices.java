package com.example.backend.services;

import com.example.backend.dto.ProductDto;
import com.example.backend.models.OrderItem;
import com.example.backend.models.Payment;
import com.example.backend.models.Product;
import com.example.backend.repositorys.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServices {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductServices productServices;

    public List<Payment> getPayment() {
        return paymentRepository.findAll();
    }

    public void pay(Payment payment) {
        for (OrderItem item : payment.getOrder().getOrderItems()) {
            ProductDto product = productServices.getProduct(item.getProductId())
                    .orElseThrow(() -> new IllegalStateException("this product dose not exist"));

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new IllegalStateException("There is no enough stock of " + product.getTitle());
            }
        }
        for (OrderItem item : payment.getOrder().getOrderItems()) {
            productServices.editStockQuantity(item.getProductId(), item.getQuantity());
        }
        paymentRepository.save(payment);
    }

}
