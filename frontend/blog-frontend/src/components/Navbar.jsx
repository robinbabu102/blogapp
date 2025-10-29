import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top w-100">
      <div className="container px-3 px-md-5">
        {/* Brand */}
        <Link to="/" className="navbar-brand fw-bold text-primary fs-4">
          <i className="bi bi-feather me-2"></i>MyBlog
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar items */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            {user ? (
              <>
                {user && (
                  <li className="btn btn-primary me-3 shadow-sm">
                    <Link className="nav-link" to="/myposts">
                      My Posts
                    </Link>
                  </li>
                )}
                {/* Optional Create button */}
                {/* <Link to="/create" className="btn btn-primary me-3 shadow-sm">
                  <i className="bi bi-plus-lg me-1"></i> Write
                </Link> */}
                <button className="btn btn-outline-dark" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-dark me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
