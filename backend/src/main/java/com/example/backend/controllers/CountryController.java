package com.example.backend.controllers;

import com.example.backend.models.Country;
import com.example.backend.services.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/countries")
public class CountryController {

    @Autowired
    private CountryService countryServices;


    @GetMapping
    public List<Country> getCountries() {
        return countryServices.findAll();

    }
}
