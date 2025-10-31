package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.dto.LoginRequestDto;
import com.example.dto.UserRequestDto;
import com.example.dto.UserResponseDto;
import com.example.service.AuthService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserRequestDto dto) {
        log.info("Received signup request");
        UserResponseDto response = authService.signup(dto);
        log.info("Signup completed");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody LoginRequestDto dto, HttpSession session) {
        log.info("Received login request");
        UserResponseDto user = authService.login(dto);
        session.setAttribute("user", user);
        log.info("User session created after login");
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        log.info("Logout request received");
        session.invalidate();
        log.info("Session invalidated");
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        log.info("Fetching current user from session");
        Object user = session.getAttribute("user");
        if (user == null) {
            log.warn("No active user session found");
            return ResponseEntity.status(401).body("Not logged in");
        }
        return ResponseEntity.ok(user);
    }
}
