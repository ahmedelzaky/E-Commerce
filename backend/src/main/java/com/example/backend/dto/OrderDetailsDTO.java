package com.example.backend.dto;

import java.util.Date;

public interface OrderDetailsDTO {
    Long getId();

    Date getArrivalDate();

    Date getOrderDate();

    String getStatue();

    String getPaymentMethod();

    Float getAmount();

    String getFirstName();

    String getLastName();

    String getPhone();

    String getCountryName();

    String getCityName();

    String getStreet();

    String getPostalCode();
}
