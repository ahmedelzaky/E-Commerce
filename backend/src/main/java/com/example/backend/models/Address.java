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
    @Column(name = "city_id")
    private Long cityId;
    @Column(name = "country_id")
    private Long countryId;
    private String street;
    @Column(name = "postal_code")
    private String postalCode;

    public Address(Long customerId, Long cityId, Long countryId, String street, String postalCode) {
        this.customerId = customerId;
        this.cityId = cityId;
        this.countryId = countryId;
        this.street = street;
        this.postalCode = postalCode;
    }
}
