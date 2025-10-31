package com.example.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.dto.PostRequestDto;
import com.example.dto.PostResponseDto;
import com.example.dto.UserResponseDto;
import com.example.service.PostService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostRequestDto dto, HttpSession session) {
        log.info("Create post request received");
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            log.warn("Create post failed - user not logged in");
            return ResponseEntity.status(401).body("You must be logged in to create a post");
        }
        dto.setAuthorId(user.getId());
        log.info("Creating post for userId: {}", user.getId());
        return ResponseEntity.ok(postService.createPost(dto));
    }

    @GetMapping
    public ResponseEntity<Page<PostResponseDto>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        log.info("Fetching posts - page {}, size {}", page, size);
        return ResponseEntity.ok(postService.getAllPosts(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long id) {
        log.info("Fetching post by id: {}", id);
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostRequestDto dto, HttpSession session) {
        log.info("Update post request for id: {}", id);
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            log.warn("Update failed - user not logged in");
            return ResponseEntity.status(401).body("You must be logged in to edit a post");
        }
        dto.setAuthorId(user.getId());
        return ResponseEntity.ok(postService.updatePost(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, HttpSession session) {
        log.info("Delete post request for id: {}", id);
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            log.warn("Delete failed - user not logged in");
            return ResponseEntity.status(401).body("You must be logged in to delete a post");
        }
        postService.deletePost(id, user.getId());
        log.info("Post deleted successfully with id: {}", id);
        return ResponseEntity.ok("Post deleted successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<Page<PostResponseDto>> searchPosts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        log.info("Searching posts with keyword: {}", keyword);
        return ResponseEntity.ok(postService.searchPosts(keyword, page, size));
    }

    @GetMapping("/my-posts")
    public ResponseEntity<?> getMyPosts(HttpSession session,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "5") int size) {
        log.info("Fetching my posts");
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            log.warn("View my posts failed - user not logged in");
            return ResponseEntity.status(401).body("You must be logged in to view your posts");
        }
        return ResponseEntity.ok(postService.getPostsByAuthor(user.getId(), page, size));
    }
}
