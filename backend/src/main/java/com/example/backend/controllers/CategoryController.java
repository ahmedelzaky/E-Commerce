package com.example.backend.controllers;


import com.example.backend.models.Category;
import com.example.backend.services.CategoryServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping(path = "add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addCategory(@RequestParam("category") String categoryJson, @RequestParam("image") MultipartFile image) {
        try {
            Category category = new ObjectMapper().readValue(categoryJson, Category.class);
            System.out.println(category);

            categoryServices.addCategory(category, image);

            return ResponseEntity.ok().body("category added successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to add category. Error: " + e.getMessage());
        }
    }

    @PutMapping(path = "update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> editCategory(@RequestParam("category") String categoryJson, @RequestParam(value = "image", required = false) MultipartFile image, @PathVariable Long id) {
        try {
            Category category = new ObjectMapper().readValue(categoryJson, Category.class);
            System.out.println(category);

            categoryServices.updateCategory(id, category, image);

            return ResponseEntity.ok().body("category updated successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to updated category. Error: " + e.getMessage());
        }
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryServices.deleteCategory(id);
        return ResponseEntity.ok().body("category deleted successfully.");
    }


}
