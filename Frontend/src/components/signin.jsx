import React, { useState } from "react";
import "./signin.css";


  import axios from "axios";
import { useNavigate } from "react-router";
export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email:"",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!formData.termsAccepted) {
    alert("You must accept the Terms and Conditions.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/register", {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    // Save user ID in localStorage
    localStorage.setItem("user", response.data._id);

    alert("Account registered successfully!");
    navigate("/form"); // navigate after success
  } catch (err) {
    console.error("Registration Error:", err);
    alert(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="signin-container">
      <div className="signin-header">
        <div className="icon-circle">
          <span className="icon">🎒</span>
        </div>
        <h1>Create Account</h1>
        <p>Register to access your internship portal account</p>
      </div>

      <div className="signin-card">
        <h2>Register</h2>
        <p className="description">Fill in your details to create an account</p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          {/* Password */}
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
              className="toggle-passwords"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password */}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="toggle-passwords"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Terms & Conditions */}
          <div className="options">
            <label className="remember">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) =>
                  setFormData({ ...formData, termsAccepted: e.target.checked })
                }
              />{" "}
              <p style={{ position: "relative", top: "-7px", left: "10px" }}>
                Accept Terms and Conditions
              </p>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="register-btn"
            disabled={!formData.termsAccepted}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
