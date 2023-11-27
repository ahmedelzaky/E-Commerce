package com.example.backend.controllers;


import com.example.backend.models.Category;
import com.example.backend.services.CategoryServices;
import com.example.backend.services.ImageService;
import com.fasterxml.jackson.core.JsonProcessingException;
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
    @Autowired
    private ImageService imageServices;

    @GetMapping
    public List<Category> getCategories() {
        return categoryServices.getAllCategories();
    }

    @PostMapping(path = "add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addCategory(@RequestParam("category") String categoryJson, @RequestParam("image") MultipartFile image) throws IOException {
        try {
            System.out.println(categoryJson);

            Category category = new ObjectMapper().readValue(categoryJson, Category.class);

            String imageUrl = imageServices.uploadImage(image);

            category.setImageUrl(imageUrl);

            categoryServices.addCategory(category);

            return ResponseEntity.ok().body("category added successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to add category. Error: " + e.getMessage());
        }
    }
}
