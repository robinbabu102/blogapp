package com.example.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	Page<Post> findByAuthorId(Long authorId, Pageable pageable);
    Page<Post> findAll(Pageable pageable);
    // Search by title or content (case-insensitive)
    Page<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
            String titleKeyword,
            String contentKeyword,
            Pageable pageable);


}
