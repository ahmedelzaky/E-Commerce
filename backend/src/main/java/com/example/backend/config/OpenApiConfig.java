package com.example.backend.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@OpenAPIDefinition(
        info = @Info(
                description = " OpenApi Documentation for E-Commerce",
                title = "E-Commerce",
                version = "1.0.1"
        ),
        servers = {
                @Server(
                        description = "Production Env",
                        url = "https://ecommerce-backend-9qsc.onrender.com"
                ),
                @Server(
                        description = "Local Env",
                        url = "http://localhost:8080"
                ),
        }
)
@RestController
@CrossOrigin
public class OpenApiConfig {
    @GetMapping(path = "/")
    public RedirectView redirectToOpenApiDocs() {
        return new RedirectView("/swagger-ui/index.html");
    }
}
