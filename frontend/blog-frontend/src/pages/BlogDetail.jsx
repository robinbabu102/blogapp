import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false); // Custom state for delete confirmation
  const [deleteError, setDeleteError] = useState(null); // State for delete errors

  // NOTE: In a real app, this should ideally be managed via React Context or a global state manager.
  // Assuming 'user' data is reliably available in localStorage for this component's purpose.
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
      // Instead of alert, redirect and rely on the next page/system to show a notification
      navigate("/", { state: { error: "Blog post not found or access denied." } });
    } finally {
      setLoading(false);
    }
  };

  // 1. Function to initiate the deletion process (shows confirmation UI)
  const handleDeleteClick = () => {
    setDeleteError(null);
    setShowConfirm(true);
  };

  // 2. Function that executes the API deletion
  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      await api.delete(`/posts/${id}`);
      // Redirect after successful deletion
      navigate("/", { state: { message: "Blog deleted successfully!" } });
    } catch (err) {
      // Show inline error message
      setDeleteError("Failed to delete blog. Please try again.");
    }
  };

  // 3. Function to cancel deletion
  const cancelDelete = () => {
    setShowConfirm(false);
  };

  useEffect(() => {
    fetchBlog();
  }, [id, navigate]); // Added navigate to dependencies for completeness

  if (loading)
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Fetching blog post details...</p>
      </div>
    );

  if (!blog)
    // This case should ideally not be reached if fetchBlog redirects on error,
    // but remains as a safeguard.
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-x-octagon-fill me-2"></i>
          Blog post not found.
        </div>
        <Link to="/" className="btn btn-primary mt-3">
          ← Back to All Posts
        </Link>
      </div>
    );

  return (
    <div className="container py-5">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Blog Post
          </li>
        </ol>
      </nav>

      {/* Blog Title */}
      <h1 className="display-4 fw-bold mb-3">{blog.title}</h1>

      {/* Metadata */}
      <div className="text-muted mb-5 d-flex flex-wrap gap-3">
        <span>
          <i className="bi bi-person-fill me-1"></i>
          By **{blog.authorName || "Unknown Author"}**
        </span>
        <span>|</span>
        <span>
          <i className="bi bi-calendar-event me-1"></i>
          Published on {formatDate(blog.createdAt)}
        </span>
      </div>

      {/* Blog Content */}
      <div className="lead mb-5 text-dark" style={{ lineHeight: 1.8 }}>
        {blog.content.split("\n").map((paragraph, index) => (
          // Use 'pb-3' for spacing between paragraphs, creating clean blocks of text
          <p key={index} className="pb-3">{paragraph}</p>
        ))}
      </div>
      
      {/* Delete Error Message (If applicable) */}
      {deleteError && (
        <div className="alert alert-danger mb-4" role="alert">
          {deleteError}
        </div>
      )}

      {/* Post Actions (Edit/Delete) */}
      {user && user.id === blog.authorId && (
        <div className="mb-5 p-4 border rounded shadow-sm bg-light d-flex flex-wrap gap-3 justify-content-between align-items-center">
          <h4 className="h5 mb-0 me-3">Post Actions</h4>
          <div className="d-flex gap-3">
            <Link
              to={`/edit/${blog.id}`}
              className="btn btn-warning shadow-sm"
            >
              <i className="bi bi-pencil-square me-2"></i>Edit Post
            </Link>
            <button onClick={handleDeleteClick} className="btn btn-danger shadow-sm">
              <i className="bi bi-trash-fill me-2"></i>Delete Post
            </button>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal UI */}
      {showConfirm && (
        <div className="modal-dialog-centered modal-backdrop bg-dark bg-opacity-50 position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
            <div className="modal-content p-4 rounded shadow-lg bg-white" style={{ maxWidth: '400px', width: '90%' }}>
                <h5 className="modal-title mb-3 text-danger">Confirm Deletion</h5>
                <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                        <i className="bi bi-trash-fill me-2"></i>Yes, Delete
                    </button>
                </div>
            </div>
        </div>
      )}


      {/* Back Button */}
      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-primary btn-lg">
          <i className="bi bi-arrow-left me-2"></i>
          Back to All Posts
        </Link>
      </div>
    </div>
  );
}

export default BlogDetail;