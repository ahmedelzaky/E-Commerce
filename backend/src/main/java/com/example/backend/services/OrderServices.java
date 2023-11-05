package com.example.backend.services;

import com.example.backend.models.Order;
import com.example.backend.repositorys.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public class OrderServices {
    @Autowired
    private OrderRepository repository;


    public void addorder(Order order) {
        repository.save(order);

    }
    public List<Order> findOrdersByDate( Date date){
        return repository.findOrdersByDate(date);

    }
    public List<Order> findall(){
       return repository.findAll();
    }
    public void deletebyid(Long id){
        Optional<Order> exist =repository.findById(id);
        if(!exist.isPresent()){
            throw new IllegalStateException("this order is not found");
        }
        else{
            repository.deleteById(id);
        }
    }
}