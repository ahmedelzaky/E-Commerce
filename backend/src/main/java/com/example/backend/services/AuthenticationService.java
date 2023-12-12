package com.example.backend.services;

import ch.qos.logback.classic.spi.EventArgUtil;
import com.example.backend.dto.AuthenticationRequest;
import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.RegisterReqest;
import com.example.backend.jwt.JwtUtils;
import com.example.backend.models.User;
import com.example.backend.repositorys.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class AuthenticationService {
    @Autowired

    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired

    private JwtUtils jwtUtils;
    @Autowired

    private AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterReqest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .phone(request.getPhone())
                .build();
        var savedUser = repository.save(user);
        var jwtToken = jwtUtils.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();


    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail()
                        , request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtUtils.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }


}
