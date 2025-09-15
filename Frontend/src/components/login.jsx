import React, { useState } from "react";

import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const navigate=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const login = await axios.post("http://localhost:5000/login",{
        email:formData.email,
        password:formData.password
      })
      .then(()=>{
        navigate("/form")
      })

    }catch(err){
      console.log("An Error Occurred",err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="icon-circle">
          <span className="icon">🎒</span>
        </div>
        <h1>Welcome Back</h1>
        <p>Sign in to your internship portal account</p>
      </div>

      <div className="login-card">
        <h2>Sign In</h2>
        <p className="description">Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="options">
            <label className="remember">
              <input type="checkbox" style={{position:"relative",top:"7px"}}/> Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
