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
        }
        else if (min != null && max != null && sortBy != null) {
            return productServices.getProductsByCategoryName(categoryName, min, max, sortBy);
        }
        else if (min != null && max != null) {
            return productServices.getProductsByCategoryName(categoryName, min, max);
        }
        else if (sortBy != null && order != null) {
            return productServices.getProductsByCategoryName(categoryName, sortBy, order);
        }
        else if (sortBy != null) {
            return productServices.getProductsByCategoryName(categoryName, sortBy);
        }
        return productServices.getProductsByCategoryName(categoryName);
    }

    @GetMapping("{productId}")
    public Optional<ProductDto> getProduct(@PathVariable Long productId) {
        return productServices.getProductDto(productId);
    }

    @PostMapping(path = "add")
    public void addProduct(@RequestBody Product product) {
        System.out.println(product);
        productServices.addProduct(product);
    }
}
