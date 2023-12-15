package com.example.backend.dto;

import java.util.Date;

public interface CustomerDto {
    Long getId();

    String getFirstName();

    String getLastName();

    String getEmail();

    String getPhone();

    Date getJoinDate();

    String getRole();

}
