package com.example.backend.services;

import com.example.backend.models.City;
import com.example.backend.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    @Autowired
    private CityRepository repository;

    public List<City> findAll(){
        return repository.findAll();
    }

    public List<City> getCityByCountryId(Long id) {
        return repository.getCityByCountryId(id);
    }
}
