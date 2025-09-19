import React from "react";
import "./card.css";
import Gold from "../assets/gold.jpg";

const JobCard = ({ job, onView }) => {
  let img;
  
  if (job.skillMatch >= 80) img = Gold;

  return (
    <div className="job-card">
      {/* Header with company logo and badge */}
      <div className="job-card-header">
        <img src={job.logo} alt={job.company} className="job-logo" />
        <div>
          <h2 className="job-title">{job.InternshipTitle}</h2>
          <p className="company">
            {job.company} • {job.location}
          </p>
        </div>
        {img && (
          <div>
            <img src={img} alt="badge" className="badge" />
          </div>
        )}
      </div>

      {/* Job info */}
      <div className="job-info">
        <p>
          <strong>📌 Field:</strong> {job.Areafield}
        </p>
        <p>
          <strong>👥 Applied:</strong> {job.CandidatesApplied}
        </p>
        <p>
          <strong>💰 Stipend:</strong> ${job.stipend} k/month
        </p>
      </div>

      {/* Tags */}
      <div className="job-tags">
        {job.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Skill match bar */}
      <div className="skill-match">
        <p className="skill-text">Skill Match: {job.skillMatch}%</p>
        <div className="skill-bar">
          <div
            className="skill-bar-fill"
            style={{ width: `${job.skillMatch}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="job-footer">
        <button className="view-job-btn" onClick={onView}>
          View Details ↗
        </button>
      </div>
    </div>
  );
};

export default JobCard;
