package com.example.backend.config;

import com.cloudinary.Cloudinary;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${application.cloudinary.api_key}")
    private String apiKey;

    @Value("${application.cloudinary.api_secret}")
    private String apiSecret;

    @Value("${application.cloudinary.cloud_name}")
    private String cloudName;


    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary("cloudinary://" + apiKey + ":" + apiSecret + "@" + cloudName);
    }
}
