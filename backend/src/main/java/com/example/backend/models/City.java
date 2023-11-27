package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "City_t")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    public City(String name) {
        this.name = name;
    }
}
