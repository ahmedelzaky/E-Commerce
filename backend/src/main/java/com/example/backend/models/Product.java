package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "product_title")
    private String title;
    @Column(columnDefinition = "numeric")
    private Float price;

    private String description;
    @Column(name = "category_id")
    private Long categoryId;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "stock_quantity")
    private Integer stockQuantity;
    @Column(columnDefinition = "numeric")
    private Float rating;

    public Product(String title, Float price, String description, Long categoryId, String imageUrl, Integer stockQuantity, Float rating) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.categoryId = categoryId;
        this.imageUrl = imageUrl;
        this.stockQuantity = stockQuantity;
        this.rating = rating;
    }
}
