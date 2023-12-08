package com.example.backend.controllers;

import com.example.backend.models.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/City")
public class CityController {
    @Autowired
    private CityService cityServices;

    @GetMapping
    public List<City> getcity(){
        return cityServices.findAll();
    }
}