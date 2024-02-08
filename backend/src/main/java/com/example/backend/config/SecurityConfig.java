package com.example.backend.config;

import com.example.backend.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;


@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
@EnableMethodSecurity


public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;

    private static final String[] WHITE_LIST_URL = {"/api/auth/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html",
            "/",
    };


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL).permitAll()
                                .requestMatchers("GET", "/api/products/**").permitAll()
                                .requestMatchers("GET", "/api/categories/**").permitAll()
                                .requestMatchers("POST", "/api/products/**").hasRole("ADMIN")
                                .requestMatchers("PUT", "/api/products/**").hasRole("ADMIN")
                                .requestMatchers("DELETE", "/api/products/**").hasRole("ADMIN")
                                .requestMatchers("POST", "/api/categories/**").hasRole("ADMIN")
                                .requestMatchers("PUT", "/api/categories/**").hasRole("ADMIN")
                                .requestMatchers("DELETE", "/api/categories/**").hasRole("ADMIN")
                                .requestMatchers("GET", "/api/payment/last-7days-earnings").hasRole("ADMIN")
                                .requestMatchers("GET", "/api/payment/hold-earnings").hasRole("ADMIN")
                                .requestMatchers("GET", "/api/payment/earnings").hasRole("ADMIN")
                                .requestMatchers("GET", "/api/payment/earnings-today").hasRole("ADMIN")
                                .requestMatchers("GET", "/api/payment/get-latest-payment").hasRole("ADMIN")
                                .requestMatchers("GET", "/api/orders/orders-count/**").hasRole("ADMIN")
                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}