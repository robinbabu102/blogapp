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
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
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
  