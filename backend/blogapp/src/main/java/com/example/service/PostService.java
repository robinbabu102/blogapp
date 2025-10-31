package com.example.service;

import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.example.dto.PostRequestDto;
import com.example.dto.PostResponseDto;
import com.example.entity.Post;
import com.example.entity.User;
import com.example.repository.PostRepository;
import com.example.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostResponseDto createPost(PostRequestDto dto) {
        log.info("Creating new post");
        User author = userRepository.findById(dto.getAuthorId())
                .orElseThrow(() -> {
                    log.warn("Create post failed - author not found");
                    return new RuntimeException("Author not found");
                });

        Post post = Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .author(author)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        postRepository.save(post);
        log.info("Post created successfully");
        return mapToDto(post);
    }

    public Page<PostResponseDto> getAllPosts(int page, int size) {
        log.info("Fetching all posts");
        Page<Post> posts = postRepository.findAll(PageRequest.of(page, size));
        return posts.map(this::mapToDto);
    }

    public PostResponseDto getPostById(Long id) {
        log.info("Fetching post by id: {}", id);
        Post post = postRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Post not found with id: {}", id);
                    return new RuntimeException("Post not found");
                });
        return mapToDto(post);
    }

    public PostResponseDto updatePost(Long id, PostRequestDto dto) {
        log.info("Updating post with id: {}", id);
        Post post = postRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Update failed - post not found");
                    return new RuntimeException("Post not found");
                });

        if (!post.getAuthor().getId().equals(dto.getAuthorId())) {
            log.warn("Update failed - user not authorized");
            throw new RuntimeException("You can only update your own posts");
        }

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setUpdatedAt(LocalDateTime.now());
        postRepository.save(post);
        log.info("Post updated successfully");
        return mapToDto(post);
    }

    public void deletePost(Long id, Long authorId) {
        log.info("Deleting post with id: {}", id);
        Post post = postRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Delete failed - post not found");
                    return new RuntimeException("Post not found");
                });

        if (!post.getAuthor().getId().equals(authorId)) {
            log.warn("Delete failed - user not authorized");
            throw new RuntimeException("You can only delete your own posts");
        }

        postRepository.delete(post);
        log.info("Post deleted successfully");
    }

    public Page<PostResponseDto> searchPosts(String keyword, int page, int size) {
        log.info("Searching posts");
        Page<Post> posts = postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
                keyword, keyword, PageRequest.of(page, size)
        );
        return posts.map(this::mapToDto);
    }

    public Page<PostResponseDto> getPostsByAuthor(Long authorId, int page, int size) {
        log.info("Fetching posts for authorId: {}", authorId);
        Page<Post> posts = postRepository.findByAuthorId(authorId, PageRequest.of(page, size));
        return posts.map(this::mapToDto);
    }

    private PostResponseDto mapToDto(Post post) {
        PostResponseDto dto = new PostResponseDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setAuthorId(post.getAuthor().getId());
        dto.setAuthorName(post.getAuthor().getName());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());
        return dto;
    }
}
