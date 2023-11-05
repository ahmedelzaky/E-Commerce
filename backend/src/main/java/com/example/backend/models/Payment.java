package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "payment_date")
    private Date paymentDate;
    @Column(name = "payment_method",
    columnDefinition ="varchar")
    private String payment_method;
    @Column(name = "amount")
    private Float amount;
    @OneToOne(targetEntity = Order.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    public Payment(Date paymentDate, String payment_method, Float amount, Order order) {
        this.paymentDate = paymentDate;
        this.payment_method = payment_method;
        this.amount = amount;
        this.order = order;
    }
}


