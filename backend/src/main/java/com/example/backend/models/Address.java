package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Address_t")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "customer_id")
    private Long customerId;
    private String street;
    @Column(name = "postal_code")
    private String postalCode;
    @Column(name = "city_id")
    private Long cityId;
    @Column(name = "country_id")
    private Long countryId;

}
