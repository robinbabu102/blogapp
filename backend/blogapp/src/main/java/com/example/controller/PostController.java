package com.example.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.PostRequestDto;
import com.example.dto.PostResponseDto;
import com.example.dto.UserResponseDto;
import com.example.service.PostService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostRequestDto dto, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("You must be logged in to create a post");
        }

        dto.setAuthorId(user.getId());
        return ResponseEntity.ok(postService.createPost(dto));
    }

    @GetMapping
    public ResponseEntity<Page<PostResponseDto>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(postService.getAllPosts(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostRequestDto dto, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("You must be logged in to edit a post");
        }

        dto.setAuthorId(user.getId());
        return ResponseEntity.ok(postService.updatePost(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("You must be logged in to delete a post");
        }

        postService.deletePost(id, user.getId());
        return ResponseEntity.ok("Post deleted successfully");
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<PostResponseDto>> searchPosts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {

        return ResponseEntity.ok(postService.searchPosts(keyword, page, size));
    }

    @GetMapping("/my-posts")
    public ResponseEntity<?> getMyPosts(HttpSession session,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "5") int size) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("You must be logged in to view your posts");
        }

        return ResponseEntity.ok(postService.getPostsByAuthor(user.getId(), page, size));
    }


}
