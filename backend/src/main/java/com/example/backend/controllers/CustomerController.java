package com.example.backend.controllers;


import com.example.backend.dto.CustomerDto;
import com.example.backend.services.CustomerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/customers")
public class CustomerController {

    @Autowired
    private CustomerServices customerServices;

    @GetMapping
    public List<CustomerDto> getCustomers() {
        return customerServices.getCustomers();
    }

    @GetMapping(path = "/{id}")
    public CustomerDto getCustomerById(@PathVariable Long id) {
        return customerServices.getCustomerById(id);
    }

    @GetMapping(path = "count")
    public Long getCustomersCount() {
        return customerServices.getCustomersCount();
    }
}
