package com.example.backend.controllers;


import com.example.backend.models.Category;
import com.example.backend.services.CategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/categories")
public class CategoryController {

    @Autowired
    private CategoryServices categoryServices;

    @GetMapping
    public List<Category> getCategories() {
        return categoryServices.getAllCategories();
    }

    @PostMapping(path = "add")
    public void addCategory(@RequestBody Category category) {
        categoryServices.addCategory(category);
    }
}
