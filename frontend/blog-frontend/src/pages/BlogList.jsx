import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../services/AuthContext";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const { currentUser } = useContext(AuthContext); // 👈 Access current user
  const isUserLoggedIn = !!currentUser;
  const searchColClass = isUserLoggedIn
    ? "col-md-6 col-lg-4 mb-3 mb-md-0" 
    : "col-12 col-md-8 col-lg-6 mb-3 mx-auto";

  const fetchBlogs = async (pageNumber = 0, search = "") => {
    setLoading(true);
    try {
      let url = search
        ? `/posts/search?keyword=${encodeURIComponent(search)}&page=${pageNumber}&size=6`
        : `/posts?page=${pageNumber}&size=6`;

      const res = await api.get(url);
      setBlogs(res.data.content);
      setFilteredBlogs(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(pageNumber);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBlogs(0, searchTerm);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="container-fluid d-flex flex-column py-3 bg-light" style={{ minHeight: "100vh" }}>
      <div className="container-fluid flex-grow-1 px-5">
        <h1 className="text-center mb-4 text-primary fw-bold">
          <i className="bi bi-book-half me-2"></i>The Latest Reads
        </h1>

        <div className="row mb-5 justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="row justify-content-between align-items-center">
              <div className={searchColClass}>
                <div className="input-group shadow-sm rounded-pill overflow-hidden">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by title or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* 👇 Show "Write Post" only if logged in */}
              {currentUser && (
                <div className="col-md-6 col-lg-3 text-md-end">
                  <Link to="/create" className="btn btn-success shadow-sm w-100 w-md-auto">
                    <i className="bi bi-pencil-square me-2"></i>Write a New Post
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Fetching amazing articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div
            className="alert alert-info text-center mx-auto"
            style={{ maxWidth: "800px" }}
            role="alert"
          >
            <i className="bi bi-exclamation-triangle me-2"></i>
            No blogs match your search. Try a different keyword!
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="col-12 col-md-6 col-lg-5 col-xl-4">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-6 pb-4 pt-2">
        <button
          onClick={() => fetchBlogs(page - 1)}
          disabled={page === 0}
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-arrow-left"></i> Previous
        </button>

        <span className="badge bg-primary fs-6 py-2 px-3">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => fetchBlogs(page + 1)}
          disabled={page + 1 >= totalPages}
          className="btn btn-outline-secondary"
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default BlogList;
