import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import JobCard from "../components/card";
import CompanyInternshipModal from "../components/popup";
import { AppBar } from "@mui/material";
import Navbar from "../components/navbar";

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [data, setData] = useState([]); // internships from backend
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      console.error("❌ No user ID found in localStorage");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8000/recommendations/${userId}`)
    // fetch(`http://localhost:5000/all-internship`) // temp endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        return res.json();
      })
      .then((data) => {
        const transformed = data.map((item, idx) => ({
          InternshipID: idx + 1,
          InternshipTitle: item.title,
          Areafield: item.sector || item.field || "General",
          CandidatesApplied: item.total_applied || 0,
          company: item.company || "Unknown Company",
          location: item.location_district || "Unknown",
          stipend: item.stipend || "N/A",
          skillMatch: Math.round(item.matching_probability || item.similarity * 100),
          tags: item.skills || [],
        }));
        setData(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // 🔄 Transform JobCard data shape into modal-friendly company object
  const mapToCompanyFormat = (job) => {
    if (!job) return null;
    return {
      name: job.company,
      internship: {
        title: job.InternshipTitle,
        sector: job.Areafield,
        area: job.Areafield,
        opportunities: 1,
        candidates: job.CandidatesApplied,
      },
      description: `This is an internship for ${job.InternshipTitle}. Stipend is ${job.stipend}.`,
      location: {
        state: "Tamil Nadu",
        district: job.location,
        village: "-",
        zipcode: "000000",
      },
      qualification: {
        minQualification: "Undergraduate",
        course: "B.Tech / B.E",
        certification: "Not mandatory",
        specialization: job.Areafield,
        skills: job.tags,
      },
      updatedAt: new Date().toISOString(),
      onApply: () =>
        alert(`Applied for ${job.InternshipTitle} at ${job.company}`),
    };
  };

  return (
    <>
    {/* <AppBar/> */}
    <Navbar/>
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
          <p>
            {data.length > 0
              ? Math.round(
                  data.reduce((acc, j) => acc + j.skillMatch, 0) / data.length
                )
              : 0}
            %
          </p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <h3>Companies</h3>
          <p>{data.length}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <h3>Best Match</h3>
          <p>
            {data.length > 0 ? Math.max(...data.map((j) => j.skillMatch)) : 0}%
          </p>
        </div>
      </div>

      {/* ===== Internship Cards ===== */}
      <div className="dashboard-container">
        {loading ? (
          <p>⏳ Loading recommendations...</p>
        ) : data.length === 0 ? (
          <p>No recommendations found</p>
        ) : (
          data.map((job) => (
            <JobCard
              key={job.InternshipID}
              job={job}
              onView={() => setSelectedJob(job)} // open modal
            />
          ))
        )}
      </div>
      <div>

      </div>
      <CompanyInternshipModal
        open={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        company={mapToCompanyFormat(selectedJob)}
      />
    </div>
    </>
  );
};

export default Dashboard;
