import React from "react";
import "./card.css";

const JobCard = ({ job, onView }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src={job.logo} alt={job.company} className="job-logo" />
        <div>
          <h2 className="job-title">{job.InternshipTitle}</h2>
          <p className="company">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      <div className="job-info">
        <p>
          <strong>📌 Field:</strong> {job.Areafield}
        </p>
        <p>
          <strong>👥 Applied:</strong> {job.CandidatesApplied}
        </p>
        <p>
          <strong>💰 Stipend:</strong>${job.stipend} k/month
        </p>
      </div>

      <div className="job-tags">
        {job.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* ✅ Skill Match Section */}
      <div className="skill-match">
        <p className="skill-text">Skill Match: {job.skillMatch}%</p>
        <div className="skill-bar">
          <div
            className="skill-bar-fill"
            style={{ width: `${job.skillMatch}%` }}
          ></div>
        </div>
      </div>

      <div className="job-footer">
        {/* 🔗 Call onView when button is clicked */}
        <button className="view-job-btn" onClick={onView}>
          View Job ↗
        </button>
      </div>
    </div>
  );
};

export default JobCard;
