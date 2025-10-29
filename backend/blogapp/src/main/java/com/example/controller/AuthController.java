package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.LoginRequestDto;
import com.example.dto.UserRequestDto;
import com.example.dto.UserResponseDto;
import com.example.service.AuthService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserRequestDto dto) {
        return ResponseEntity.ok(authService.signup(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody LoginRequestDto dto, HttpSession session) {
        UserResponseDto user = authService.login(dto);
        // store user in session
        session.setAttribute("user", user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        Object user = session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }
        return ResponseEntity.ok(user);
    }
}