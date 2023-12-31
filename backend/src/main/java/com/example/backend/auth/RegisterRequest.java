package com.example.backend.auth;

import com.example.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor

public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private Role role;
}
