package com.example.backend.services;

import com.example.backend.models.Address;
import com.example.backend.repositorys.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServices {
    @Autowired
    private AddressRepository addressRepository;
    public Optional<Address> getAddressByCustomerId(Long customerId){
        Optional<Address> address=addressRepository.findAddressByCustomerId(customerId);
        address.orElseThrow(()->new IllegalStateException("this Customer id " +customerId+" is not found!"));
        return address;
    }

}
