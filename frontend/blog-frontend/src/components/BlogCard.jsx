import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
function BlogCard({ blog }) {
  return (
    // CHANGE: Added height: '100%' to ensure cards in the grid are uniform height
    <div className="card mb-4 shadow-sm blog-card-hover" style={{ height: '100%' }}> 
      <div className="card-body d-flex flex-column"> {/* Use flex-column for better layout control */}
        <div className="mb-3">
          <span className="badge bg-primary mb-2">Blog Post</span>
          <small className="text-muted d-block">
            <i className="bi bi-clock me-1"></i> {formatDate(blog.createdAt || new Date())}
          </small>
        </div>
        <h5 className="card-title text-dark fw-bold mb-3">{blog.title}</h5>
        <p className="card-text text-secondary flex-grow-1" style={{ fontSize: '0.95rem' }}>
          {blog.content.length > 180 
            ? blog.content.substring(0, 180) + "..."
            : blog.content}
        </p>     
        <div className="mt-auto pt-3 border-top"> {/* mt-auto pushes to the bottom */}
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted fw-medium">
              <i className="bi bi-person me-1"></i> By {blog.authorName || 'Unknown Author'}
            </small>
          <Link to={`/blog/${blog.id}`} 
              className="btn btn-primary btn-sm rounded-pill px-3">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>  </div></div>);
}
export default BlogCard;