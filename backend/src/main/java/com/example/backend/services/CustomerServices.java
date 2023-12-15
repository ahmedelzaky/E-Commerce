package com.example.backend.services;

import com.example.backend.dto.CustomerDto;
import com.example.backend.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServices {
    @Autowired
    private UserRepository userRepository;

    public List<CustomerDto> getCustomers() {
        return userRepository.getCustomers();
    }

    public Long getCustomersCount() {
        return userRepository.findCustomerCount();
    }


    public CustomerDto getCustomerById(Long id) {
        return userRepository.findCustomerById(id).orElseThrow(() -> new IllegalStateException("Customer with id " + id + " does not exist"));
    }
}
