package com.example.service;

import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.dto.LoginRequestDto;
import com.example.dto.UserRequestDto;
import com.example.dto.UserResponseDto;
import com.example.entity.User;
import com.example.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserResponseDto signup(UserRequestDto dto) {
        log.info("Processing signup");
        if (userRepository.existsByEmail(dto.getEmail())) {
            log.warn("Signup failed - email already exists");
            throw new RuntimeException("Email is already registered");
        }

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        userRepository.save(user);
        log.info("User registered successfully");
        return mapToDto(user);
    }

    public UserResponseDto login(LoginRequestDto dto) {
        log.info("Processing login");
        Optional<User> userOpt = userRepository.findByEmail(dto.getEmail());
        if (userOpt.isEmpty()) {
            log.warn("Login failed - user not found");
            throw new RuntimeException("Invalid email or password");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            log.warn("Login failed - invalid credentials");
            throw new RuntimeException("Invalid email or password");
        }

        log.info("Login successful");
        return mapToDto(user);
    }

    private UserResponseDto mapToDto(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }
}
