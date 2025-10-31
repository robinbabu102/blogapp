import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return date.toLocaleDateString(undefined, options);
};

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load current user details from local storage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    const fetchBlog = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setBlog(res.data);
      } catch (err) {
        alert("Failed to fetch blog details.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${id}`);
        alert("Post deleted successfully.");
        navigate("/myposts");
      } catch (err) {
        alert("Failed to delete post. Check permissions.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading blog post...</p>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center py-5">Post not found.</div>;
  }

  // Check if the current user is the author
  const isAuthor = currentUser && blog.authorId === currentUser.id;

  return (
    // FIX: Changed from container to container-fluid for full width
    <div className="container-fluid py-5 px-4" style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}> 
        <div className="row justify-content-center">
            {/* FIX: Centered the content column using mx-auto */}
            <div className="col-12 col-lg-9 col-xl-8 mx-auto"> 
                
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Blog Post</li>
                    </ol>
                </nav>

                {/* Title and Metadata */}
                <h1 className="fw-bold mb-3">{blog.title}</h1>
                <div className="text-muted mb-5 d-flex flex-wrap gap-3" style={{ fontSize: '0.9rem' }}>
                    <span>
                        <i className="bi bi-person me-1"></i> 
                        By **{blog.authorName || 'Unknown Author'}**
                    </span>
                    <span>
                        <i className="bi bi-calendar me-1"></i> 
                        Published on {formatDate(blog.createdAt)}
                    </span>
                </div>

                {/* Blog Content */}
                <div className="lead blog-content mb-5 p-4 rounded shadow-sm content-text">
                    {/* Using pre-wrap to preserve formatting like line breaks */}
                    <p style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</p> 
                </div>

                {/* Action Buttons (visible only to the author) */}
                {isAuthor && (
                    <div className="card p-3 shadow-sm mb-5">
                        <p className="fw-bold mb-2">Post Actions</p>
                        <div className="d-flex gap-2">
                            <Link to={`/edit/${blog.id}`} className="btn btn-warning d-flex align-items-center">
                                <i className="bi bi-pencil-square me-2"></i>Edit Post
                            </Link>
                            <button onClick={handleDelete} className="btn btn-danger d-flex align-items-center">
                                <i className="bi bi-trash-fill me-2"></i>Delete Post
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Back Button */}
                <div className="mt-5">
                    <Link to="/" className="btn btn-outline-secondary d-inline-flex align-items-center">
                        <i className="bi bi-arrow-left me-2"></i>Back to All Posts
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BlogDetail;