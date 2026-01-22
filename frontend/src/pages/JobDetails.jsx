import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import Footer from "../components/Footer";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 Temporary static data (replace with API later)
  const job = {
    title: "Business Development Intern",
    company: "Instasell Technology",
    experience: "0 - 5 years",
    salary: "₹ 2.4 - 3 Lacs P.A.",
    location: "Bengaluru (Indira Nagar)",
    posted: "1 day ago",
    openings: 1,
    applicants: 29,
    description:
      "We are looking for a Business Development Intern who can help us expand our customer base and maintain strong client relationships.",
    highlights: [
      "Work with senior sales professionals",
      "Hands-on exposure to business strategy",
      "Opportunity for full-time conversion",
    ],
    skills: ["Communication", "Sales", "Negotiation", "Market Research"],
    responsibilities: [
      "Identify potential clients",
      "Assist sales team in lead generation",
      "Prepare reports and presentations",
    ],
  };


  return (
    <div className="job-details-page">
      {/* 🔹 MAIN CONTENT */}
      <div className="job-details-main">
        {/* Job Header Card */}
        <div className="job-header-card">
          <div>
            <h1>{job.title}</h1>
            <h3>{job.company}</h3>

            <div className="job-meta">
              <span>{job.experience}</span>
              <span>{job.salary}</span>
              <span>{job.location}</span>
            </div>
          </div>

          <div className="job-actions">
            <button className="save-btn">Save</button>
            <button className="apply-btn" onClick={() => navigate(`/apply/${id}`)}>Apply</button>
          </div>
        </div>

        {/* Job Stats */}
        <div className="job-stats">
          <span>Posted: {job.posted}</span>
          <span>Openings: {job.openings}</span>
          <span>Applicants: {job.applicants}</span>
        </div>

        {/* Job Description */}
        <section className="job-section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </section>

        {/* Job Highlights */}
        <section className="job-section">
          <h2>Job Highlights</h2>
          <ul>
            {job.highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Key Skills */}
        <section className="job-section">
          <h2>Key Skills</h2>
          <div className="skills">
            {job.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section className="job-section">
          <h2>Responsibilities</h2>
          <ul>
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* 🔹 RELEVANT JOBS */}
      <Footer />
    </div>
  );
};

export default JobDetails;
