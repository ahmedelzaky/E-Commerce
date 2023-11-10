package com.example.backend.services;


import com.example.backend.dto.ProductDto;
import com.example.backend.models.Product;
import com.example.backend.repositorys.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServices {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryServices categoryServices;

    public List<ProductDto> getProducts() {
        return productRepository.findAllProducts();
    }

    public List<ProductDto> getProducts(String sortBy) {
        return productRepository.findAllProductsAndSort(sortBy);
    }

    public List<ProductDto> getProducts(Integer min, Integer max) {
        return productRepository.findProductsWithRange(min, max);
    }

    public List<ProductDto> getProducts(Integer min, Integer max, String sortBy) {
        return productRepository.findProductsWithRangeAndSort(min, max, sortBy);
    }

    public List<ProductDto> getProductsByCategoryName(String categoryName) {
        if (!categoryServices.isCategoryExist(categoryName)) {
            throw new IllegalStateException("category " + categoryName + " dose not exist");
        }
        return productRepository.findAllProductsByCategoryName(categoryName);
    }

    public List<ProductDto> getProductsByCategoryName(String categoryName, Integer min, Integer max) {
        if (!categoryServices.isCategoryExist(categoryName)) {
            throw new IllegalStateException("category " + categoryName + " dose not exist");
        }
        return productRepository.findProductsByCategoryNameAndRange(categoryName, min, max);
    }

    public List<ProductDto> getProductsByCategoryName(String categoryName, String sortBy) {
        if (!categoryServices.isCategoryExist(categoryName)) {
            throw new IllegalStateException("category " + categoryName + " dose not exist");
        }
        return productRepository.findProductsByCategoryNameAndSort(categoryName, sortBy);
    }

    public List<ProductDto> getProductsByCategoryName(String categoryName, Integer min, Integer max, String sortBy) {
        if (!categoryServices.isCategoryExist(categoryName)) {
            throw new IllegalStateException("category " + categoryName + " dose not exist");
        }
        return productRepository.findProductsByCategoryNameAndRangeAndSort(categoryName, min, max, sortBy);
    }

    public Optional<Product> getProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        product.orElseThrow(() -> new IllegalStateException(" the product is not exist"));
        return product;
    }

    public Optional<ProductDto> getProductDto(Long productId) {
        Optional<ProductDto> product = productRepository.findProductDtoById(productId);
        product.orElseThrow(() -> new IllegalStateException(" the product is not exist"));
        return product;
    }

    public void addProduct(Product product) {
        Optional<Product> exist = productRepository.findByTittle(product.getTitle());
        if (exist.isPresent()) {
            throw new IllegalStateException("This product is already exist");
        }
        productRepository.save(product);
    }

    @Transactional
    public void editStockQuantity(Long id, int qty) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("this product dose not exist"));
        product.setStockQuantity(product.getStockQuantity() - qty);

    }
}
