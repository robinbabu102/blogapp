import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BlogCard from "../components/BlogCard";

function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMyPosts = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await api.get(`/posts/my-posts?page=${pageNumber}&size=6`);
      setMyPosts(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(pageNumber);
    } catch (err) {
      console.error("Error fetching my posts:", err);
      if (err.response?.status === 401) {
        alert("Please log in to view your posts");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);
  

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary fw-bold">
        <i className="bi bi-person-lines-fill me-2"></i> My Posts
      </h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : myPosts.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-emoji-frown me-2"></i>
          You haven’t written any posts yet.
          <br />
          <Link to="/create" className="btn btn-sm btn-success mt-3">
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {myPosts.map((blog) => (
            <div key={blog.id} className="col-md-6 col-lg-4">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
        <button
          onClick={() => fetchMyPosts(page - 1)}
          disabled={page === 0}
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-arrow-left"></i> Previous
        </button>

        <span className="badge bg-primary fs-6 py-2 px-3">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => fetchMyPosts(page + 1)}
          disabled={page + 1 >= totalPages}
          className="btn btn-outline-secondary"
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default MyPosts;
