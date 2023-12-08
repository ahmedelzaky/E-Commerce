package com.example.backend.dto;

public interface AddressDto {
    Long getId();

    Long getCustomerId();

    String getStreet();

    String getPostalCode();

    String getCityName();

    String getCountryName();

}
