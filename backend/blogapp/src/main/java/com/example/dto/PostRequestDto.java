package com.example.dto;

import lombok.Data;

@Data
public class PostRequestDto {
    private String title;
    private String content;
    private Long authorId; // We'll use this temporarily before full authentication
}

