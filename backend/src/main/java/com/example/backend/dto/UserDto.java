package com.example.backend.dto;

import com.example.backend.enums.Role;
import lombok.Getter;

@Getter
public class UserDto {
    private Long id;
    private Role role;

    public UserDto(Long id, Role role) {
        this.id = id;
        this.role = role;
    }

    public UserDto() {
    }

}
