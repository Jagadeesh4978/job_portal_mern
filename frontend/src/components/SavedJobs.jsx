import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jobAPI } from "../services/api";
import "./style.css";

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoStr = localStorage.getItem("userInfo");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || !userInfoStr) {
      setError("Please login to view saved jobs");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const userData = JSON.parse(userInfoStr);
    setUserInfo(userData);
    fetchSavedJobs(userData._id);
  }, [navigate]);

  const fetchSavedJobs = async (userId) => {
    try {
      setLoading(true);
      const data = await jobAPI.getSavedJobs(userId);

      if (data.error) {
        setError(data.error || "Failed to load saved jobs");
      } else {
        setSavedJobs(data.savedJobs || []);
      }
    } catch (err) {
      console.error("Error fetching saved jobs:", err);
      setError("Error loading saved jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsaveJob = async (jobId) => {
    try {
      const result = await jobAPI.unsaveJob(userInfo._id, jobId);

      if (result.error) {
        alert("Failed to unsave job");
      } else {
        setSavedJobs(savedJobs.filter(job => job._id !== jobId));
        alert("Job removed from saved jobs");
      }
    } catch (err) {
      console.error("Error unsaving job:", err);
      alert("Error removing job from saved");
    }
  };

  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  if (loading) {
    return (
      <div className="saved-jobs-page">
        <div className="saved-jobs-container">
          <p className="loading-message">Loading saved jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-jobs-page">
        <div className="saved-jobs-container">
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{color: '#e74c3c', fontSize: '16px', marginBottom: '20px'}}>
              {error}
            </p>
            <button 
              onClick={() => navigate("/login")}
              style={{
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-jobs-page">
      <div className="saved-jobs-container">
        <div className="saved-jobs-header">
          <h1>Saved Jobs</h1>
          <p className="saved-count">
            You have {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {savedJobs.length === 0 ? (
          <div className="no-saved-jobs">
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#f8f9fa',
              borderRadius: '12px'
            }}>
              <h2 style={{color: '#666', marginBottom: '10px'}}>No Saved Jobs Yet</h2>
              <p style={{color: '#999', marginBottom: '20px'}}>
                Start exploring and save jobs that interest you!
              </p>
              <button 
                onClick={() => navigate("/jobs")}
                style={{
                  padding: '12px 30px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Browse Jobs
              </button>
            </div>
          </div>
        ) : (
          <div className="saved-jobs-list">
            {savedJobs.map((job) => (
              <div key={job._id} className="saved-job-card">
                <div className="job-card-content">
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <button 
                      className="unsave-btn"
                      onClick={() => handleUnsaveJob(job._id)}
                      title="Remove from saved"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="job-company-info">
                    <p className="company-name">{job.company}</p>
                    {job.postedBy && (
                      <p className="posted-by">
                        Posted by: {job.postedBy.firstName} {job.postedBy.lastName}
                      </p>
                    )}
                  </div>

                  <div className="job-meta">
                    <span className="meta-item">
                      <strong>Location:</strong> {job.location}
                    </span>
                    <span className="meta-item">
                      <strong>Type:</strong> {job.jobType}
                    </span>
                    <span className="meta-item">
                      <strong>Experience:</strong> {job.experience}
                    </span>
                  </div>

                  {job.salary && (
                    <div className="job-salary">
                      <strong>Salary:</strong> 
                      {job.salary.min && job.salary.max 
                        ? ` ${job.salary.min} - ${job.salary.max}` 
                        : ' Negotiable'}
                    </div>
                  )}

                  <div className="job-description">
                    <p>{job.description.substring(0, 200)}...</p>
                  </div>

                  {job.skills && job.skills.length > 0 && (
                    <div className="job-skills">
                      <strong>Required Skills:</strong>
                      <div className="skills-tags">
                        {job.skills.slice(0, 5).map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                        {job.skills.length > 5 && (
                          <span className="skill-tag">+{job.skills.length - 5} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="job-actions">
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(job._id)}
                  >
                    View Details
                  </button>
                  <button 
                    className="apply-btn"
                    onClick={() => handleApply(job._id)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="saved-jobs-footer">
          <button 
            className="back-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
