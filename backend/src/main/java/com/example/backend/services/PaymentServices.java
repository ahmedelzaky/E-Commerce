package com.example.backend.services;

import com.example.backend.models.Payment;
import com.example.backend.repositorys.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServices {
    @Autowired
    private PaymentRepository paymentRepository;
    public List<Payment>getPayment(){
        return paymentRepository.findAll();
    }
    public void pay(Payment payment){
        paymentRepository.save(payment);
    }

}
