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
    @Column(name = "order_date", insertable = false)
    private Date orderDate;
    @Column(name = "arrival_date")
    private Date arrivalDate;

    @OneToOne(targetEntity = Address.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @OneToMany(targetEntity = OrderItem.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    List<OrderItem> orderItems;

    public Order(long customerId, Date orderDate, Date arrivalDate, List<OrderItem> orderItems, Address address) {
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.arrivalDate = arrivalDate;
        this.orderItems = orderItems;
        this.address = address;
    }
}
