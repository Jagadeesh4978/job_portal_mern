import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { applicationAPI } from "../services/api";
import "./style.css";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch user's applied jobs on component mount
  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo._id) {
        setError("Please login to view applied jobs");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }

      const data = await applicationAPI.getUserApplications(userInfo._id);

      if (data && data.applications) {
        setApplications(data.applications);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Failed to load applications");
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Error loading applications");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f39c12",
      reviewed: "#3498db",
      shortlisted: "#27ae60",
      rejected: "#e74c3c",
      accepted: "#27ae60",
    };
    return colors[status] || "#95a5a6";
  };

  const getStatusIcon = (status) => {
    return "";
  };

  const filteredApplications = 
    filterStatus === "all" 
      ? applications 
      : applications.filter(app => app.status === filterStatus);

  if (loading) {
    return (
      <div className="applied-jobs-page">
        <div className="applied-jobs-container">
          <p className="loading-message">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="applied-jobs-page">
        <div className="applied-jobs-container">
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
              onClick={() => navigate("/")}
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
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="applied-jobs-page">
      <div className="applied-jobs-container">
        {/* Header */}
        <div className="applied-jobs-header">
          <h1>My Applied Jobs</h1>
          <button 
            className="back-btn" 
            onClick={() => navigate("/view-profile")}
          >
            Back to Profile
          </button>
        </div>

        {/* Filter */}
        <div className="applied-jobs-filter">
          <label>Filter by Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Applications ({applications.length})</option>
            <option value="pending">Pending ({applications.filter(a => a.status === "pending").length})</option>
            <option value="reviewed">Reviewed ({applications.filter(a => a.status === "reviewed").length})</option>
            <option value="shortlisted">Shortlisted ({applications.filter(a => a.status === "shortlisted").length})</option>
            <option value="rejected">Rejected ({applications.filter(a => a.status === "rejected").length})</option>
            <option value="accepted">Accepted ({applications.filter(a => a.status === "accepted").length})</option>
          </select>
        </div>

        {/* Applications List */}
        <div className="applied-jobs-list">
          {filteredApplications.length === 0 ? (
            <div className="no-applications">
              <p>No applications found</p>
              <button 
                onClick={() => navigate("/jobs")}
                className="explore-btn"
              >
                Explore Jobs
              </button>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div key={application._id} className="application-card">
                {/* Status Badge */}
                <div className="app-status-badge" style={{backgroundColor: getStatusColor(application.status)}}>
                  <span>{getStatusIcon(application.status)} {application.status.toUpperCase()}</span>
                </div>

                {/* Job Information */}
                <div className="app-job-info">
                  <h3 className="app-job-title">{application.job?.title || "Job Title"}</h3>
                  <p className="app-company">
                    {application.job?.company || "Company Name"}
                  </p>
                  <p className="app-location">
                    {application.job?.location || "Location"}
                  </p>
                  <p className="app-description">
                    {application.job?.description || "No description available"}
                  </p>
                </div>

                {/* Application Details */}
                <div className="app-details">
                  <div className="app-detail-row">
                    <span className="detail-label">Applied Date:</span>
                    <span className="detail-value">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="app-detail-row">
                    <span className="detail-label">Applicant:</span>
                    <span className="detail-value">
                      {application.firstName} {application.lastName}
                    </span>
                  </div>
                  <div className="app-detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{application.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="app-actions">
                  <button
                    className="view-form-btn"
                    onClick={() => navigate(`/application/${application._id}`)}
                  >
                    View Application Form
                  </button>
                  <button
                    className="job-details-btn"
                    onClick={() => navigate(`/jobs/${application.job?._id}`)}
                  >
                    View Job Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
