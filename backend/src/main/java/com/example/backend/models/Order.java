package com.example.backend.models;

import com.example.backend.enums.OrderStatus;
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
    private Long id;
    @Column(name = "customer_id")
    private Long customerId;
    @Column(name = "order_date", insertable = false)
    private Date orderDate;
    @Column(name = "arrival_date")
    private Date arrivalDate;
    @Column(name = "order_status", insertable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "address_id")
    private Long addressId;

    @OneToMany(targetEntity = OrderItem.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    List<OrderItem> orderItems;

}
