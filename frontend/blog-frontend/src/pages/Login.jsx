import { useState, useContext } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      setCurrentUser(res.data); // instantly updates Navbar
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            <i className="bi bi-person-circle me-2"></i>Log In
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  id="emailInput"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  id="passwordInput"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Log In
            </button>

            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-none">
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
