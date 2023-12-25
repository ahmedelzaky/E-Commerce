package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Product_t")
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

}
