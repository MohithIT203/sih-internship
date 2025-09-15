import React from "react";
import "./internship.css";

const internships = [
  {
    id: 1,
    company: "TechSoft",
    logo: "https://via.placeholder.com/60",
    title: "Frontend Developer Intern",
    location: "Bangalore",
    area: "Web Development",
    vacancies: 3,
    stipend: "Yes",
  },
  {
    id: 2,
    company: "DataWorks",
    logo: "https://via.placeholder.com/60",
    title: "Data Analyst Intern",
    location: "Hyderabad",
    area: "Data Science",
    vacancies: 2,
    stipend: "No",
  },
  {
    id: 3,
    company: "CloudNet",
    logo: "https://via.placeholder.com/60",
    title: "Cloud Engineer Intern",
    location: "Remote",
    area: "Cloud Computing",
    vacancies: 4,
    stipend: "Yes",
  },
  {
    id: 4,
    company: "CyberSec",
    logo: "https://via.placeholder.com/60",
    title: "Cyber Security Intern",
    location: "Delhi",
    area: "Security",
    vacancies: 2,
    stipend: "Yes",
  },
];

export default function InternshipList() {
  return (
    <div>
      {/* Header Section */}
      <div className="recommendations-header">
        <div className="recommendations-icon">✨</div>
        <h1>Your AI-Powered Recommendations</h1>
        <p>
          Based on your preferences, we've found the most suitable internships
          for you. Each recommendation includes a match score to help you
          prioritize.
        </p>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <h3>Avg Match Score</h3>
          <p className="stat-value">63%</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <h3>Companies</h3>
          <p className="stat-value">4</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <h3>Best Match</h3>
          <p className="stat-value">63%</p>
        </div>
      </div>

      {/* Internship Cards Section */}
      <div className="internship-container">
        {internships.map((intern) => (
          <div className="internship-card" key={intern.id}>
            <div className="internship-header">
              <img
                src={intern.logo}
                alt={intern.company}
                className="company-logo"
              />
              <h2>{intern.company}</h2>
            </div>

            <div className="internship-body">
              <p>
                <strong>ID:</strong> {intern.id}
              </p>
              <p>
                <strong>Title:</strong> {intern.title}
              </p>
              <p>
                <strong>Location:</strong> {intern.location}
              </p>
              <p>
                <strong>Area:</strong> {intern.area}
              </p>
              <p>
                <strong>Vacancies:</strong> {intern.vacancies}
              </p>
              <p>
                <strong>Stipend:</strong> {intern.stipend}
              </p>
            </div>

            <div className="internship-footer">
              <button className="view-btn">View</button>
              <button className="apply-btn">Apply Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
