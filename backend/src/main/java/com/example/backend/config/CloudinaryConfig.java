package com.example.backend.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary("cloudinary://513388223958163:iVJlYrxLWD19Si_5EY9NFYNU5kA@dtldqbm5m");
    }
}
