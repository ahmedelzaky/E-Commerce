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

        List<AddressDto> addresses = addressRepository.CustomFindAddressByCustomerId(customerId);
        if (addresses.isEmpty()) {
            throw new IllegalStateException("this id " + customerId + " is not found");
        }
        return addresses;
    }

    public void addAddress(Address address) {
        addressRepository.save(address);
    }

}
