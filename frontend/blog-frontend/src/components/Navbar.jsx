import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../services/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("user");
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    } finally {
      setIsOpen(false);
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top w-100 mb-3">
      <div className="container px-3 px-md-5">
        <Link
          to="/"
          className="navbar-brand fw-bold text-primary fs-4"
          onClick={closeMenu}
        >
          <i className="bi bi-feather me-2"></i>
          MyBlog
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarContent"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${
            isOpen ? "show" : ""
          }`}
          id="navbarContent"
        >
          <div className="d-flex flex-column flex-lg-row align-items-lg-center mt-3 mt-lg-0">
            {currentUser ? (
              <>
                <div className="btn btn-primary me-lg-3 shadow-sm" onClick={closeMenu}>
                  <Link className="nav-link text-white p-0" to="/myposts">
                    My Posts
                  </Link>
                </div>
                <button className="btn btn-outline-dark" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-dark me-lg-2"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                  onClick={closeMenu}
                >
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
