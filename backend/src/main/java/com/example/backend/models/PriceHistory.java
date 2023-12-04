package com.example.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

public class PriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "product_id")
    private long product_id;
    @Column(name = "price")
    private Float price;
    @Column(name = "date", insertable = false)
    private Date date;
    public PriceHistory( long product_id , Float price, Date date) {
        this.product_id = product_id;
        this.price = price;
        this.date = date;
    }
}
