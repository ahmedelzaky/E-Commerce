package com.example.backend.controllers;


import com.example.backend.dto.ProductDto;
import com.example.backend.models.Product;
import com.example.backend.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(path = "api/products")
public class ProductController {
    @Autowired
    private ProductServices productServices;

    @GetMapping
    public List<ProductDto> getProducts(@Param("min") Integer min, @Param("max") Integer max) {
        System.out.println("min: " + min + "  max: " + max);
        if (min != null && max != null) {
            return productServices.getProducts(min, max);
        }
        return productServices.getProducts();
    }

    @GetMapping(path = "category/{productCategory}")
    public List<ProductDto> getProductsByCategoryName(@PathVariable String productCategory) throws Exception {
        return productServices.getProductsByCategoryName(productCategory);
    }

    @GetMapping("{productId}")
    public Optional<ProductDto> getProduct(@PathVariable Long productId) {
        return productServices.getProduct(productId);
    }

    @PostMapping(path = "add")
    public void addProduct(@RequestBody Product product) {
        System.out.println(product);
        productServices.addProduct(product);
    }
}
