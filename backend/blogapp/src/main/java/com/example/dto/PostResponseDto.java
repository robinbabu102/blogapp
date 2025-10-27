package com.example.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PostResponseDto {
    private Long id;
    private String title;
    private String content;
    private String authorName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
