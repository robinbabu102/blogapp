import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">MyBlog</Link>
      <div className="ms-auto">
        {user ? (
          <>
            <Link to="/create" className="btn btn-outline-light me-2">Create</Link>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/signup" className="btn btn-outline-light">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
