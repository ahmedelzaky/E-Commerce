package com.example.backend.controllers;

import com.example.backend.models.City;
import com.example.backend.services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/cities")
public class CityController {
    @Autowired
    private CityService cityServices;

    @GetMapping
    public List<City> getCity() {
        return cityServices.findAll();
    }
}