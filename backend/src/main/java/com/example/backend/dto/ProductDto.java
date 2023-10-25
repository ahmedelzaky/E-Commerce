package com.example.backend.dto;

public interface ProductDto {
    Long getId();

    String getTitle();

    String getCategoryName();

    String getImageUrl();

    Float getPrice();

    Integer getStockQuantity();

    Float getRating();

    String getDescription();
}
