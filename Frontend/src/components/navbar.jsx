import React from "react";
import "../pages/landing.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const LogoutNavigate = () => {
    localStorage.clear();
    // cookie.remove("token");
    navigate("/");
    window.alert("Logout Successful")
  };

  const ProfileNavigate = () => {
    navigate("/profile");
  };
  const dashboardNavigate = () => {
    navigate("/dashboard");
  };
  const homeNavigate = () => {
    navigate("/");
  };
  return (
<div className="header" style={{position:"sticky",top:0,zIndex:100,backgroundColor:"white"}}>
        <p className="Title">InternPortal</p>
        <div className="button-group">
            
            <button className="Sign-In" onClick={homeNavigate}>
            Home
          </button>
          
            {isLoggedIn && (
                <>
          <button className="Sign-In" onClick={dashboardNavigate}>
            Dashboard
          </button>
          <button className="Sign-In" onClick={ProfileNavigate}>
            Profile
          </button>
          <button className="Start" onClick={LogoutNavigate}>
            Logout
          </button>
          </>
            )}
        </div>
      </div>
  );
}
export default Navbar;