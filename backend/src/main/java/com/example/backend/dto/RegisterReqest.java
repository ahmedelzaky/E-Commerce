package com.example.backend.dto;

import com.example.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor

public class RegisterReqest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private Role role;
}
