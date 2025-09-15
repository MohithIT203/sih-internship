import { useState } from "react";
import "./App.css";
import React from "react";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login";
import SigninPage from "./components/signin";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SigninPage />} />
    </Routes>
  );
}

export default App;
