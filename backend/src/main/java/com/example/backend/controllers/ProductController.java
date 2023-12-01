package com.example.backend.controllers;


import com.example.backend.dto.ProductDto;
import com.example.backend.models.Product;
import com.example.backend.services.ProductServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(path = "api/products")
public class ProductController {
    @Autowired
    private ProductServices productServices;


    @GetMapping
    public List<ProductDto> getProducts(@Param("min") Integer min,
                                        @Param("max") Integer max,
                                        @Param("sortBy") String sortBy,
                                        @Param("order") String order) {
        System.out.println("min: " + min + "  max: " + max + " sortBy: " + sortBy + " order: " + order);
        if (min != null && max != null && sortBy != null && order != null) {
            return productServices.getProducts(min, max, sortBy, order);
        } else if (min != null && max != null && sortBy != null) {
            return productServices.getProducts(min, max, sortBy);
        } else if (min != null && max != null) {
            return productServices.getProducts(min, max);
        } else if (sortBy != null && order != null) {
            return productServices.getProducts(sortBy, order);
        } else if (sortBy != null) {
            return productServices.getProducts(sortBy);
        }
        return productServices.getProducts();
    }

    @GetMapping(path = "category/{categoryName}")
    public List<ProductDto> getProductsByCategoryName(@PathVariable String categoryName,
                                                      @Param("min") Integer min,
                                                      @Param("max") Integer max,
                                                      @Param("sortBy") String sortBy,
                                                      @Param("order") String order) {
        System.out.println("categoryName: " + categoryName + " min: " + min + "  max: " + max + " sortBy: " + sortBy + " order: " + order);

        if (min != null && max != null && sortBy != null && order != null) {
            return productServices.getProductsByCategoryName(categoryName, min, max, sortBy, order);
        } else if (min != null && max != null && sortBy != null) {
            return productServices.getProductsByCategoryName(categoryName, min, max, sortBy);
        } else if (min != null && max != null) {
            return productServices.getProductsByCategoryName(categoryName, min, max);
        } else if (sortBy != null && order != null) {
            return productServices.getProductsByCategoryName(categoryName, sortBy, order);
        } else if (sortBy != null) {
            return productServices.getProductsByCategoryName(categoryName, sortBy);
        }
        return productServices.getProductsByCategoryName(categoryName);
    }

    @GetMapping("{productId}")
    public Optional<ProductDto> getProduct(@PathVariable Long productId) {
        return productServices.getProductDto(productId);
    }

    @PostMapping(path = "add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addProduct(
            @RequestParam("file") MultipartFile image,
            @RequestParam("product") String productJson) {
        try {
            Product product = new ObjectMapper().readValue(productJson, Product.class);
            System.out.println(product);

            productServices.addProduct(product, image);

            return ResponseEntity.ok().body("Product added successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to add product. Error: " + e.getMessage());
        }
    }

    @PutMapping(path = "update/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateProduct(
            @PathVariable Long productId,
            @RequestParam(value = "file", required = false) MultipartFile image,
            @RequestParam("product") String productJson) {
        try {
            Product product = new ObjectMapper().readValue(productJson, Product.class);
            System.out.println(product);

            productServices.updateProduct(productId, product, image);

            return ResponseEntity.ok().body("Product updated successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to update product. Error: " + e.getMessage());
        }
    }

    @DeleteMapping(path = "delete/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        productServices.deleteProduct(productId);

        return ResponseEntity.ok().body("Product deleted successfully.");
    }

}
