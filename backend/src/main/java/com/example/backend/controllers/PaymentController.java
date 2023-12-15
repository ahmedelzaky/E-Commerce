package com.example.backend.controllers;

import com.example.backend.models.Payment;
import com.example.backend.services.PaymentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/payment")
public class PaymentController {
    @Autowired
    private PaymentServices paymentServices;

    @GetMapping()
    public List<Payment> getPayment() {
        return paymentServices.getPayment();
    }

    @GetMapping("/earnings")
    public Double getEarnings() {
        return paymentServices.getEarnings();
    }

    @GetMapping("/earnings-today")
    public Double getEarningsToday() {
        return paymentServices.getEarningsToday();
    }

    @GetMapping("/customer/{id}")
    public List<Payment> getPaymentByCustomerId(@PathVariable("id") Long id) {
        return paymentServices.getPaymentByCustomerId(id);
    }

    @GetMapping("/get-payment-by-date/{date}")
    public List<Payment> getPaymentByDate(@PathVariable("date") LocalDate date) {
        return paymentServices.getPaymentByDate(date);
    }

    @GetMapping("/get-latest-payment")
    public List<Payment> getLatestPayment() {
        return paymentServices.getLatestPayments();
    }

    @PostMapping("/pay")
    public ResponseEntity<String> pay(@RequestBody Payment payment) {
        try {
            paymentServices.pay(payment);
            return ResponseEntity.ok("Payment is added");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
