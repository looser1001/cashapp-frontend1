
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// At the top of your file, near other imports/variable definitions
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("${API_BASE_URL}/api/admin/login", {
        username,
        password,
      });
      if (res.data.success) {
        navigate("/admin");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br/><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
