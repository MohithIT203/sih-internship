import React from "react";
import "./landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const LoginNavigate = () => {
    navigate("/login");
  };
  const homeNavigate = () => {
    navigate("/");
  };
  const dashboardNavigate = () => {
    navigate("/dashboard");
  };
  const LogoutNavigate = () => {
    localStorage.clear();
    navigate("/");
  };
  const SignupNavigate = () => {
    navigate("/signup");
  };
  const ProfileNavigate = () => {
    navigate("/profile");
  };
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  return (
    <>
      <div className="header">
        <p className="Title">InternPortal</p>
        <div className="button-group">
          {isLoggedIn ? (
            <>
              <button className="Sign-In" onClick={homeNavigate}>
                Home
              </button>
              
              <button className="Sign-In" onClick={dashboardNavigate}>
                Dashboard
              </button>
              <button className="Sign-In" onClick={ProfileNavigate}>
                Profile
              </button>
              <button className="Start" onClick={LogoutNavigate}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button className="Sign-In" onClick={LoginNavigate}>
                Sign In
              </button>
              <button className="Start" onClick={SignupNavigate}>
                Get Started
              </button>
            </>
          )}
        </div>
      </div>

      <div className="image-section">
        <p
          style={{
            color: "black",
            fontSize: "50px",
            fontWeight: "bold",
          }}
        >
          Your Gateway to
          <span style={{ color: "slateblue" }}> Amazing Internships</span>
        </p>
        <p
          style={{
            color: "rgba(49, 48, 48, 1)",
            fontSize: "20px",
            fontWeight: "7px",

            zIndex: 1,
          }}
        >
          Connect talented students with innovative companies.
          <br />
          Find your perfect internship match and kickstart your career journey.
        </p>
        <div className="btn-div">
          <button className="img-sign" onClick={SignupNavigate}>
            Start Your Journey
          </button>
          <button className="img-log" onClick={LoginNavigate}>
            I Have an Account
          </button>
        </div>
      </div>
      <div className="body-section">
        <p className="body-p">Why choose InternPortal?</p>
        <p className="body-p2">
          Everything you need for a successful internship experience
        </p>
      </div>

      <div className="cards">
        <div className="card student">
          <h3>For Students</h3>
          <p className="subtitle">
            Discover internships that match your skills and career goals
          </p>
          <ul>
            <li>Browse thousands of opportunities</li>
            <li>Build your professional profile</li>
            <li>Connect directly with employers</li>
          </ul>
        </div>

        <div className="card company">
          <h3>For Companies</h3>
          <p className="subtitle">
            Find talented interns and build your future workforce
          </p>
          <ul>
            <li>Access top student talent</li>
            <li>Post internship opportunities</li>
            <li>Manage applications efficiently</li>
          </ul>
        </div>

        <div className="card stories">
          <h3>Success Stories</h3>
          <p className="subtitle">
            Join thousands of successful internship matches
          </p>
          <ul>
            <li>95% placement rate</li>
            <li>500+ partner companies</li>
            <li>10,000+ successful matches</li>
          </ul>
        </div>
      </div>
      <br />
      <br />
      <div className="footer">
        <p
          style={{
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          Ready to Get Started?
        </p>
        <p
          style={{
            fontWeight: "normal",
            fontSize: "16px",
          }}
        >
          Join thousands of students and companies already using InternPortal
        </p>
        <br />
        <button className="final-btn" onClick={SignupNavigate}>
          Create Your Account
        </button>
      </div>
    </>
  );
}

export default Landing;
