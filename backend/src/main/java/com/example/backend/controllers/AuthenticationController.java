package com.example.backend.controllers;

import com.example.backend.dto.AuthenticationRequest;
import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.RegisterReqest;
import com.example.backend.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")

public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private  UserDetailsService userDetailsService;
    private AuthenticationService service;
    @PostMapping("register")

    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterReqest request) {
        return ResponseEntity.ok(service.register(request));
    }
//@PostMapping("authenticate")
//    public ResponseEntity<AuthenticationResponse> register(
//            @RequestBody AuthenticationRequest request) {
//    }


}
