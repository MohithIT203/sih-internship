import { useState } from "react";
import "./App.css";
import React from "react";
import Landing from "./pages/landing";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login";
import SigninPage from "./components/signin";
import InternshipProfileForm from "./ProfileForm/internshipProfileForm";
import "./index.css";
import Recommendations from "./pages/recommend";
import { AppBar } from "@mui/material";
import Profile from "./pages/Profile.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/dashboard" element={<Recommendations />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SigninPage />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/form" element={<InternshipProfileForm/>} />
    </Routes>
  );
}

export default App;
