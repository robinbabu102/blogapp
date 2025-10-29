import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function BlogEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, form);
      alert("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (err) {
      alert("Failed to update blog");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="content"
          rows="8"
          value={form.content}
          onChange={handleChange}
        />
        <button className="btn btn-success w-100">Update</button>
      </form>
    </div>
  );
}

export default BlogEdit;
