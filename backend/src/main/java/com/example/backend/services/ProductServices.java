package com.example.backend.services;


import com.example.backend.dto.ProductDto;
import com.example.backend.models.Product;
import com.example.backend.repositorys.ProductRepository;
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


    public Optional<ProductDto> getProduct(Long productId) {
        return productRepository.findSpecific(productId);
    }

    public List<ProductDto> getProductsByCategoryName(String categoryName) throws Exception {
        if (!categoryServices.isCategoryExist(categoryName)) {
            throw new IllegalStateException("category " + categoryName + " dose not exist");
        }
        return productRepository.findAllByCategoryName(categoryName);
    }

    public void addProduct(Product product) {
        Optional exist = productRepository.findByTittle(product.getTitle());
        if (exist.isPresent()) {
            throw new IllegalStateException("This product is already exist");
        }
        productRepository.save(product);
    }
}
