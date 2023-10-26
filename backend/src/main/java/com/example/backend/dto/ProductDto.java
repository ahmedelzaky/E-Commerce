package com.example.backend.dto;

public interface ProductDto {
    Long getId();

    String getTitle();

    String getCategory();

    String getImage();

    Float getPrice();

    Integer getStockQuantity();

    Float getRating();

    String getDescription();
}
