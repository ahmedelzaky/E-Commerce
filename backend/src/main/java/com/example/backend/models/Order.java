package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Order_t")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "customer_id")
    private long customerId;
    @Column(name = "order_date")
    private Date orderDate;
    @Column(name = "total_amount")
    private float totalAmount;
    @Column(name = "arrival_date")
    private Date arrivalDate;

    @OneToMany(targetEntity = OrderItem.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    List<OrderItem> orderItems;

    public Order(long customerId, Date orderDate, float totalAmount, Date arrivalDate, List<OrderItem> orderItems) {
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.arrivalDate = arrivalDate;
        this.orderItems = orderItems;
    }
}
