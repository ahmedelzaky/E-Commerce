package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "order_id")
    private long orderId;
    private int quantity;
    @Column(name = "product_id")
    private long productId;

    public OrderItem(long orderId, int quantity, long productId) {
        this.orderId = orderId;
        this.quantity = quantity;
        this.productId = productId;
    }
}
