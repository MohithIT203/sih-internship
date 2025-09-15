import React from "react";
import "./card.css";

const JobCard = ({ job, onView }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src="data:image/jpeg;base64,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" alt={job.company} className="job-logo" />
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
          <strong>💰 Stipend:</strong> {job.stipend}
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
