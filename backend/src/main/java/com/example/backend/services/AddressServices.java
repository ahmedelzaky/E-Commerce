package com.example.backend.services;

import com.example.backend.dto.AddressDto;
import com.example.backend.models.Address;
import com.example.backend.repositorys.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServices {
    @Autowired
    private AddressRepository addressRepository;

    public List<AddressDto> getAddressByCustomerId(Long customerId) {
        return addressRepository.CustomFindAddressByCustomerId(customerId);
    }

    public void addAddress(Address address) {
        System.out.println(address);
        addressRepository.save(address);
    }

}
