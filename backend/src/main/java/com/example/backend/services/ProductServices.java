package com.example.backend.services;


import com.example.backend.dto.ProductDto;
import com.example.backend.models.Product;
import com.example.backend.repositorys.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServices {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryServices categoryServices;
    @Autowired
    private ImageService imageService;

    public List<ProductDto> getProducts() {
        return productRepository.findAllProducts();
    }

    public List<ProductDto> getProducts(String sortBy) {
        return productRepository.findAllProductsAndSort(sortBy);
    }

    public List<ProductDto> getProducts(String sortBy, String order) {
        if (order.equals("asc")) {
            return productRepository.findAllProductsAndSortAsc(sortBy);
        }
        return productRepository.findAllProductsAndSortDesc(sortBy);
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

    public List<ProductDto> getProductsByCategoryName(String categoryName, String sortBy, String order) {
        if (!categoryServices.isCategoryExist(categoryName)) {
            throw new IllegalStateException("category " + categoryName + " dose not exist");
        }
        if (order.equals("asc")) {
            return productRepository.findProductsByCategoryNameAndSortAsc(categoryName, sortBy);
        }
        return productRepository.findProductsByCategoryNameAndSortDesc(categoryName, sortBy);
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

    public void addProduct(Product product, MultipartFile image) throws IOException {
        Optional<Product> exist = productRepository.findByTittle(product.getTitle());
        if (exist.isPresent()) {
            throw new IllegalStateException("There is a another product with the same title");
        }
        String imageUrl = imageService.uploadImage(image);

        product.setImageUrl(imageUrl);
        productRepository.save(product);
    }

    @Transactional
    public void editStockQuantity(Long id, int qty) {
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalStateException("this product dose not exist"));
        product.setStockQuantity(product.getStockQuantity() - qty);

    }

    public List<ProductDto> getProducts(Integer min, Integer max, String sortBy, String order) {
        if (order.equals("asc")) {
            return productRepository.findProductsWithRangeAndSortAsc(min, max, sortBy);
        }
        return productRepository.findProductsWithRangeAndSortDesc(min, max, sortBy);
    }

    public List<ProductDto> getProductsByCategoryName(String categoryName, Integer min, Integer max, String sortBy, String order) {
        if (order.equals("asc")) {
            return productRepository.findProductsByCategoryNameAndRangeAndSortAsc(categoryName, min, max, sortBy);
        }
        return productRepository.findProductsByCategoryNameAndRangeAndSortDesc(categoryName, min, max, sortBy);
    }

    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalStateException("the product dose not exist"));
        imageService.deleteImage(product.getImageUrl());
        productRepository.deleteById(productId);
    }

    @Transactional
    public void updateProduct(Long productId, Product UpdatedProduct, MultipartFile image) throws IOException {

        Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalStateException("the product dose not exist"));
        if (UpdatedProduct.getTitle() != null && !UpdatedProduct.getTitle().isEmpty() && !UpdatedProduct.getTitle().equals(product.getTitle())) {
            product.setTitle(UpdatedProduct.getTitle());
        }
        if (UpdatedProduct.getDescription() != null && !UpdatedProduct.getDescription().isEmpty() && !UpdatedProduct.getDescription().equals(product.getDescription())) {
            product.setDescription(UpdatedProduct.getDescription());
        }
        if (UpdatedProduct.getPrice() != null && !UpdatedProduct.getPrice().equals(product.getPrice())) {
            product.setPrice(UpdatedProduct.getPrice());
        }
        if (UpdatedProduct.getStockQuantity() != null && !UpdatedProduct.getStockQuantity().equals(product.getStockQuantity())) {
            product.setStockQuantity(UpdatedProduct.getStockQuantity());
        }
        if (UpdatedProduct.getCategoryId() != null && !UpdatedProduct.getCategoryId().equals(product.getCategoryId())) {
            product.setCategoryId(UpdatedProduct.getCategoryId());
        }
        if (image != null) {
            String imageUrl = imageService.uploadImage(image);
            product.setImageUrl(imageUrl);
        }
    }

    public List<ProductDto> searchProducts(String searchText) {
        searchText = "%" + searchText + "%";
        return productRepository.searchProducts(searchText);
    }

    public List<ProductDto> searchProductsByCategoryName(String searchText, String categoryName) {
        searchText = "%" + searchText + "%";
        return productRepository.searchProductsByCategoryName(searchText, categoryName);
    }

    public List<ProductDto> getTopSellingProducts() {
        return productRepository.findTopSellingProducts();
    }
}
