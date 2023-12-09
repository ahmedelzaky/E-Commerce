package com.example.backend.controllers;

import com.example.backend.models.Payment;
import com.example.backend.services.PaymentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    @GetMapping("/customer/{id}")
    public List<Payment> getPaymentByCustomerId(@PathVariable("id") Long id) {
        return paymentServices.getPaymentByCustomerId(id);
    }
    @GetMapping("/get-payment-by-date/{date}")
    public List<Payment> getPaymentByDate(@PathVariable("date")LocalDate date){
        return paymentServices.getPaymentByDate(date);
    }

    @PostMapping("/pay")
    public void pay(@RequestBody Payment payment) {
        System.out.println(payment);
        paymentServices.pay(payment);
    }


}
