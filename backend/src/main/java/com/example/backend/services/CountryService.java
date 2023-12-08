package com.example.backend.services;

import com.example.backend.models.Country;
import com.example.backend.repositorys.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {
    @Autowired
    private CountryRepository repository;

    public List<Country> findAll(){
        return repository.findAll();
    }
}
