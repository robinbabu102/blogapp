import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom"; 

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      // Give a small delay before the alert for cleaner UX
      setTimeout(() => {
        alert("Signup successful! Please login.");
        navigate("/login");
      }, 100);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    // 1. Centering the form on the page vertically and horizontally using flex utilities
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Card for the login form with responsive sizing */}
      <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}> 
        <div className="card-body">
          
          {/* Clear, bold heading with an icon */}
          <h2 className="card-title text-center mb-4">
            <i className="bi bi-person-plus-fill me-2 text-primary"></i>
            Create Account </h2> 
          
          <form onSubmit={handleSubmit}>
            
            {/* Name Input Group */}
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">Full Name</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person"></i></span>
                <input 
                  id="nameInput"
                  className="form-control" 
                  name="name" 
                  placeholder="Full Name" 
                  onChange={handleChange} 
                  required
                />
              </div>
            </div>
            
            {/* Email Input Group */}
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                <input 
                  id="emailInput"
                  className="form-control" 
                  name="email" 
                  placeholder="Email address" 
                  onChange={handleChange} 
                  type="email" 
                  required
                />
              </div>
            </div>

            {/* Password Input Group */}
            <div className="mb-4">
              <label htmlFor="passwordInput" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input 
                  id="passwordInput"
                  className="form-control" 
                  name="password" 
                  type="password" 
                  placeholder="Password (min. 6 characters)" 
                  onChange={handleChange} 
                  required
                  minLength="6" // Basic front-end validation hint
                />
              </div>
            </div>

            {/* Use primary button with shadow for emphasis */}
            <button className="btn btn-primary w-100 mb-3" type="submit">
              Sign Up
            </button>

            <p className="text-center mt-3 text-muted">
              Already have an account? 
              <Link to="/login" className="text-decoration-none fw-bold ms-1">
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;