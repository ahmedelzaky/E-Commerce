package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Price_history_t")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "product_id")
    private Long product_id;
    @Column(columnDefinition = "numeric")
    private Float price;
    @Column(name = "date", insertable = false)
    private Date date;
}
