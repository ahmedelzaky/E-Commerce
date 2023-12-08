package com.example.backend.services;

import com.example.backend.models.Address;
import com.example.backend.repositorys.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServices {
    @Autowired
    private AddressRepository addressRepository;
    public List<Address> getAddressByCustomerId(Long customerId){

       List<Address> addresses= addressRepository.findAddressByCustomerId(customerId);
       if (addresses.isEmpty()){
           throw new IllegalStateException("this id "+customerId+" is not found");
       }
       return addresses;
    }
    public void addAddress(Address address){
    addressRepository.save(address);

    }

}
