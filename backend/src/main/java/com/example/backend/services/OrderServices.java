package com.example.backend.services;

import com.example.backend.models.Order;
import com.example.backend.repositorys.OrderRepository;
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



    public List<Order> findOrdersByDate( LocalDate date){
        return repository.findOrdersByDate(date);

    }
    public List<Order> findAll(){
       return repository.findAll();
    }

    }
