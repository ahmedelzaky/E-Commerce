package com.example.backend.controllers;

import com.example.backend.models.Payment;
import com.example.backend.services.PaymentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/payment")
public class PaymentController {
    @Autowired
    private PaymentServices paymentServices;

    @GetMapping()
    public List<Payment> getPayment() {
        return paymentServices.getPayment();
    }

    @PostMapping("/pay")
    public void pay(@RequestBody Payment payment) {
        System.out.println(payment);
        paymentServices.pay(payment);
    }

}
