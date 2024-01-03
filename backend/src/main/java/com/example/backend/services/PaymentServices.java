package com.example.backend.services;

import com.example.backend.dto.CustomerDto;
import com.example.backend.dto.Earnings;
import com.example.backend.enums.PaymentMethod;
import com.example.backend.models.OrderItem;
import com.example.backend.models.Payment;
import com.example.backend.models.Product;
import com.example.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class PaymentServices {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductServices productServices;
    @Autowired
    private EmailService emailService;
    @Autowired
    private CustomerServices customerServices;

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
            productServices.editStockQuantity(item.getProductId(), item.getQuantity(), false);
        }
    }

    public void pay(Payment payment) {
        if (payment.getOrder().getAddressId() == null) throw new IllegalStateException("Address is required");
        CheckProductsQuantity(payment.getOrder().getOrderItems());

        editProductsStockQuantity(payment.getOrder().getOrderItems());

        if (payment.getPaymentMethod() == PaymentMethod.VISA) payment.setPaymentDate(new Date());

        CustomerDto customer = customerServices.getCustomerById(payment.getOrder().getCustomerId());

        emailService.sendEmail(customer.getEmail(), "Order is placed", createPaymentEmail(payment));
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

    public Double getHoldEarnings() {
        return paymentRepository.getHoldEarnings();
    }

    public List<Payment> getLatestPayments() {
        return paymentRepository.findLatestPayments();
    }

    public List<Earnings> getLast7DaysEarnings() {
        return paymentRepository.getLast7DaysEarnings();
    }

    String createPaymentEmail(Payment payment) {
        CustomerDto customer = customerServices.getCustomerById(payment.getOrder().getCustomerId());
        String email = "Dear " + customer.getFirstName() + " " + customer.getLastName() + ",\n\n" +
                "Your order is placed successfully.\n\n" +
                "Order details:\n" +
                "Order Date: " + new Date() + "\n" +
                "Payment Method: " + payment.getPaymentMethod() + "\n" +
                "Total Price: " + payment.getAmount() + "\n\n" +
                "Thank you for shopping with us.\n\n" +
                "Regards,\n" +
                "Amagon Team";
        return email;
    }
}
