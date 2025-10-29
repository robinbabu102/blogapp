import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function BlogCreate() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/posts", form);
      alert("Blog created successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to create blog. You might need to log in again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">Create New Blog Post</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Title
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="title"
                    placeholder="Enter blog title..."
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="content" className="form-label fw-semibold">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    name="content"
                    rows="12"
                    placeholder="Write your blog content here..."
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Publishing...
                      </>
                    ) : (
                      "Publish Post"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCreate;