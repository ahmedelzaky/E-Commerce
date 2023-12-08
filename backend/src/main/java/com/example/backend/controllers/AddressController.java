package com.example.backend.controllers;

import com.example.backend.models.Address;
import com.example.backend.services.AddressServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/address")
public class AddressController {
    @Autowired
    private AddressServices addressServices;
    @PostMapping("getAddressByCustomerId/{id}")
    public Optional<Address> getAddressByCustomerId(@PathVariable("id") Long customerId){
        return addressServices.getAddressByCustomerId(customerId);
    }
}
