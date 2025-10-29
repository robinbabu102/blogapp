// src/components/BlogCard.jsx

import { Link } from "react-router-dom";

// Helper function assumed to be defined elsewhere (e.g., in a utils file)
// For this example, we'll include a simple placeholder function
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function BlogCard({ blog }) {
  return (
    // Keep the design: shadow and hover effect for interactivity
    <div className="card mb-4 shadow-sm blog-card-hover"> 
      <div className="card-body d-flex flex-column"> {/* Use flex-column for better layout control */}
        
        {/* --- Header Metadata (New Content) --- */}
        <div className="mb-3">
          {/* Badge for categorization/type */}
          <span className="badge bg-primary mb-2">Blog Post</span>
          {/* Formatted Date */}
          <small className="text-muted d-block">
            <i className="bi bi-clock me-1"></i> {formatDate(blog.createdAt || new Date())}
          </small>
        </div>
        
        {/* Title */}
        <h5 className="card-title text-dark fw-bold mb-3">{blog.title}</h5>
        
        {/* Content Preview */}
        <p className="card-text text-secondary flex-grow-1" style={{ fontSize: '0.95rem' }}>
          {blog.content.length > 180 
            ? blog.content.substring(0, 180) + "..."
            : blog.content}
        </p>
        
        {/* --- Footer Metadata and Action (New Content) --- */}
        <div className="mt-auto pt-3 border-top"> {/* mt-auto pushes to the bottom */}
          <div className="d-flex justify-content-between align-items-center">
            {/* Author Name */}
            <small className="text-muted fw-medium">
              <i className="bi bi-person me-1"></i> By {blog.authorName || 'Unknown Author'}
            </small>
            
            {/* Read More Button (Styled for a modern look) */}
            <Link 
              to={`/blog/${blog.id}`} 
              className="btn btn-primary btn-sm rounded-pill px-3" // Using rounded-pill and px-3
            >
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default BlogCard;