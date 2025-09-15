import React, { useState } from "react";
import "./Dashboard.css";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.jpeg";
import pic3 from "../assets/pic3.jpeg";
import pic4 from "../assets/pic4.png";
import JobCard from "../components/card";

const Dashboard = () => {
  const [data] = useState([
    {
      InternshipID: 1,
      InternshipTitle: "Software Engineer",
      Areafield: "Development",
      CandidatesApplied: 20,
      company: "Tech Corp",
      location: "Sathyamangalam",
      logo: pic1,
      stipend: "$1k/month",
      skillMatch: 63,
      tags: ["Frontend", "React", "Agile"],
    },
    {
      InternshipID: 2,
      InternshipTitle: "Product Manager",
      Areafield: "Development",
      CandidatesApplied: 15,
      company: "Innovate Ltd",
      location: "Chennai",
      logo: pic2,
      stipend: "$1.2k/month",
      skillMatch: 75,
      tags: ["Product Strategy", "Leadership", "Scrum"],
    },
    {
      InternshipID: 3,
      InternshipTitle: "Data Analyst",
      Areafield: "Data Science",
      CandidatesApplied: 12,
      company: "DataWorks",
      location: "Salem",
      logo: pic3,
      stipend: "$900/month",
      skillMatch: 50,
      tags: ["SQL", "Python", "Analytics"],
    },
    {
      InternshipID: 4,
      InternshipTitle: "UI/UX Designer",
      Areafield: "Design",
      CandidatesApplied: 10,
      company: "BIT",
      location: "Erode",
      logo: pic4,
      stipend: "$800/month",
      skillMatch: 80,
      tags: ["Figma", "User Research", "Prototyping"],
    },
  ]);

  return (
    <div className="dashboard-wrapper">
      {/* ===== AI Recommendations Header ===== */}
      <div className="recommendations-header">
        <div className="recommendations-icon">✨</div>
        <h1>Your AI-Powered Recommendations</h1>
        <p>
          Based on your preferences, we’ve found the most suitable internships
          for you. Each recommendation includes a match score to help you
          prioritize.
        </p>
      </div>

      {/* ===== Stats Section ===== */}
      <div className="recommendation-stats">
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <h3>Avg Match Score</h3>
          <p>63%</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <h3>Companies</h3>
          <p>1</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <h3>Best Match</h3>
          <p>63%</p>
        </div>
      </div>

      {/* ===== Internship Cards ===== */}
      <div className="dashboard-container">
        {data.map((job) => (
          <JobCard key={job.InternshipID} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
