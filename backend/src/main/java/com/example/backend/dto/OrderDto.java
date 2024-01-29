package com.example.backend.dto;

import jakarta.persistence.Column;

import java.util.Date;

public interface OrderDto {
    Long getId();

    Long getCustomerId();

    Date getOrderDate();

    Date getArrivalDate();
}
