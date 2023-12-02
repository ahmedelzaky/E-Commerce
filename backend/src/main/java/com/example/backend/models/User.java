package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user_t")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String email;
    private String phone;
    @Column(name = "join_date")
    private Date joinDate;
    private String password;
    private  String role;

    @OneToMany(targetEntity = Address.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    List<Address> addresses;

    public User(String firstName, String lastName, String email, String phone,
                Date joinDate, String password, List<Address> addresses,String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.joinDate = joinDate;
        this.password = password;
        this.addresses = addresses;
        this.role = role;
    }
}
