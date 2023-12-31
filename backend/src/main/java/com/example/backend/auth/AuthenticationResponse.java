package com.example.backend.auth;

import com.example.backend.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor

public class AuthenticationResponse {
    private String token;
    private UserDto user;
}
