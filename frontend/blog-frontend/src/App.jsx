import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogList from "./pages/BlogList";
import BlogCreate from "./pages/BlogCreate";
import BlogDetail from "./pages/BlogDetail";
import BlogEdit from "./pages/BlogEdit";
import MyPosts from "./pages/MyPosts";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<BlogList currentUser={currentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<BlogCreate />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/edit/:id" element={<BlogEdit />} />
        <Route path="/myposts" element={<MyPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
