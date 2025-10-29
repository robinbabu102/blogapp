import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BlogCard from "../components/BlogCard";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch blogs based on page number
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
  }, 400); // waits 400ms after typing stops

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);

  return (
    // CHANGE 1: Use d-flex and flex-column to enable stretching of content area
    <div className="container-fluid d-flex flex-column py-5 bg-light" style={{ minHeight: '100vh' }}>
      <div className="container flex-grow-1"> {/* CHANGE 2: flex-grow-1 ensures this section fills available vertical space */}
        <h1 className="text-center mb-5 text-primary fw-bold">
          <i className="bi bi-book-half me-2"></i>The Latest Reads
        </h1>
        
        {/* Search Bar and New Post Button */}
        <div className="row mb-5 justify-content-between align-items-center">
          
          {/* Search Input Group */}
          <div className="col-md-6 col-lg-4 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Create Post Link */}
          <div className="col-md-6 col-lg-3 text-md-end">
            <Link to="/create" className="btn btn-success shadow-sm w-100 w-md-auto">
              <i className="bi bi-pencil-square me-2"></i>Write a New Post
            </Link>
          </div>
        </div>

        {/* Loading and Empty State */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Fetching amazing articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            No blogs match your search. Try a different keyword!
          </div>
        ) : (
          // Blog Grid Layout (Responsive Grid)
          <div className="row g-4">
            {filteredBlogs.map((blog) => (
              // Adjust column sizes for different screen sizes
              <div key={blog.id} className="col-xl-4 col-md-6 col-12">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination is now outside the flex-grow-1 area, ensuring it's always at the bottom */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-5 pb-4">
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