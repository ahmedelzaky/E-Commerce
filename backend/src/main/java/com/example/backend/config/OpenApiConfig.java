package com.example.backend.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(info = @Info(
        description = " OpenApi Documentation for E-Commerce",
        title = "E-Commerce",
        version = "0.5"
), servers = {
        @Server(
                description = "Local Env",
                url = "http://localhost:8080"
        ),
        @Server(
                description = "Production Env",
                url = "https://ecommerce-backend-9qsc.onrender.com"
        ),
})
public class OpenApiConfig {

}
