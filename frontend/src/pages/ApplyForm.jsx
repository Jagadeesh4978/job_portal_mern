import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './style.css';

const ApplyForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // Sample job data - in a real app, fetch from API using jobId
  const jobData = {
    1: { title: 'Software Engineer', company: 'Tech Corp', location: 'New York, NY' },
    2: { title: 'Data Analyst', company: 'Data Inc', location: 'San Francisco, CA' },
    3: { title: 'Frontend Developer', company: 'Web Solutions', location: 'Austin, TX' },
    4: { title: 'UX Designer', company: 'Design Studio', location: 'Los Angeles, CA' },
    5: { title: 'Backend Engineer', company: 'Server Tech', location: 'Seattle, WA' },
    6: { title: 'Product Manager', company: 'Innovate Ltd', location: 'Chicago, IL' },
  };

  const currentJob = jobData[jobId] || { title: 'Job Position', company: 'Company', location: 'Location' };

  const [formData, setFormData] = useState({
    // Personal
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    email: "",
    altEmail: "",
    mobile: "",
    altMobile: "",
    dob: "",
    gender: "",

    // Address
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",

    // Education (MULTIPLE)
    educationList: [
      {
        educationType: "",
        course: "",
        college: "",
        score: "",
        universityRegNo: "",
      },
    ],

    // Certification
    professionalCert: "",
    certName: "",
    proficiency: "",
    certNumber: "",
    issueDate: "",

    // Attachments
    resumeName: "",
    terms: false,
  });

  // ✅ HANDLERS
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.educationList];
    updatedEducation[index][name] = value;
    setFormData({ ...formData, educationList: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      educationList: [
        ...formData.educationList,
        {
          educationType: "",
          course: "",
          college: "",
          score: "",
          universityRegNo: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.educationList.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, educationList: updatedEducation });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    console.log("Application Submitted:", formData);
    setSubmitted(true);
  };

  // ✅ SUCCESS PAGE
  if (submitted) {
    return (
      <div className="apply-success-container">
        <div className="success-icon">🎉</div>
        <h2>Application Submitted Successfully!</h2>
        <p>Thank you for applying to <strong>{currentJob.title}</strong> at <strong>{currentJob.company}</strong></p>
        <p>We will review your application and contact you shortly at the email provided.</p>
        <button className="success-btn" onClick={() => navigate('/jobs')}>
          ← Back to Job Listings
        </button>
      </div>
    );
  }

  // ✅ FORM
  return (
    <div className="apply-form-page">
      {/* Header */}
      <div className="apply-form-header">
        <h1>Submit Your Application</h1>
        <p>Apply for your next opportunity</p>
      </div>

      <div className="apply-form-wrapper">
        {/* Job Info Card */}
        <div className="job-info-card">
          <div className="job-info-content">
            <h3>📌 Position Details</h3>
            <div className="job-info-grid">
              <div className="job-info-item">
                <label>Position</label>
                <p>{currentJob.title}</p>
              </div>
              <div className="job-info-item">
                <label>Company</label>
                <p>{currentJob.company}</p>
              </div>
              <div className="job-info-item">
                <label>Location</label>
                <p>{currentJob.location}</p>
              </div>
            </div>
          </div>
          <button 
            type="button" 
            className="back-btn" 
            onClick={() => navigate(`/jobs/${jobId}`)}
          >
            ← View Full Job Details
          </button>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="apply-form">
          {/* PERSONAL DETAILS */}
          <div className="form-section">
            <h3 className="section-title">👤 Personal Information</h3>
            <div className="form-row">
              <input 
                className="form-input" 
                name="firstName" 
                placeholder="First Name *" 
                required 
                onChange={handleChange} 
              />
              <input 
                className="form-input" 
                name="middleName" 
                placeholder="Middle Name" 
                onChange={handleChange} 
              />
              <input 
                className="form-input" 
                name="lastName" 
                placeholder="Last Name *" 
                required 
                onChange={handleChange} 
              />
            </div>
            
            <input 
              className="form-input-full" 
              name="preferredName" 
              placeholder="Preferred Name" 
              onChange={handleChange} 
            />

            <div className="form-row">
              <input 
                className="form-input" 
                type="email" 
                name="email" 
                placeholder="Email *" 
                required 
                onChange={handleChange} 
              />
              <input 
                className="form-input" 
                type="email" 
                name="altEmail" 
                placeholder="Alternate Email" 
                onChange={handleChange} 
              />
            </div>

            <div className="form-row">
              <input 
                className="form-input" 
                name="mobile" 
                placeholder="Mobile Number *" 
                required 
                onChange={handleChange} 
              />
              <input 
                className="form-input" 
                name="altMobile" 
                placeholder="Alternate Mobile" 
                onChange={handleChange} 
              />
            </div>

            <div className="form-row">
              <input 
                className="form-input" 
                type="date" 
                name="dob" 
                required 
                onChange={handleChange} 
              />
              <select 
                className="form-input" 
                name="gender" 
                required 
                onChange={handleChange}
              >
                <option value="">Select Gender *</option>
                <option>Male</option>
                <option>Female</option>
                <option>I choose not to specify</option>
              </select>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="form-section">
            <h3 className="section-title">📍 Address Details</h3>
            <textarea 
              className="form-textarea" 
              name="address" 
              placeholder="Address *" 
              required 
              onChange={handleChange} 
            />
            <div className="form-row">
              <input 
                className="form-input" 
                name="pincode" 
                placeholder="Pincode *" 
                required 
                onChange={handleChange} 
              />
              <input 
                className="form-input" 
                name="city" 
                placeholder="City *" 
                required 
                onChange={handleChange} 
              />
            </div>
            <div className="form-row">
              <input 
                className="form-input" 
                name="state" 
                placeholder="State *" 
                required 
                onChange={handleChange} 
              />
              <input 
                className="form-input" 
                name="country" 
                placeholder="Country *" 
                required 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* EDUCATION */}
          <div className="form-section">
            <h3 className="section-title">🎓 Education Details</h3>

            {formData.educationList.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-header">
                  <h4>Education #{index + 1}</h4>
                  {formData.educationList.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-btn" 
                      onClick={() => removeEducation(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="form-row">
                  <select
                    className="form-input"
                    name="educationType"
                    required
                    value={edu.educationType}
                    onChange={(e) => handleEducationChange(index, e)}
                  >
                    <option value="">Select Education *</option>
                    <option>X</option>
                    <option>XII</option>
                    <option>Diploma</option>
                    <option>Bachelors</option>
                    <option>Masters</option>
                    <option>PhD</option>
                  </select>

                  <input
                    className="form-input"
                    name="course"
                    placeholder="Course / Branch *"
                    required
                    value={edu.course}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                </div>

                <div className="form-row">
                  <input
                    className="form-input"
                    name="college"
                    placeholder="School / College Name *"
                    required
                    value={edu.college}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                  <input
                    className="form-input"
                    name="score"
                    placeholder="CGPA / Percentage *"
                    required
                    value={edu.score}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                </div>

                <input
                  className="form-input-full"
                  name="universityRegNo"
                  placeholder="University / Roll Number *"
                  required
                  value={edu.universityRegNo}
                  onChange={(e) => handleEducationChange(index, e)}
                />
              </div>
            ))}

            <button type="button" className="add-edu-btn" onClick={addEducation}>
              ➕ Add More Education
            </button>
          </div>

          {/* CERTIFICATION */}
          <div className="form-section">
            <h3 className="section-title">🏆 Professional Certifications</h3>
            <select 
              className="form-input-full" 
              name="professionalCert" 
              required 
              onChange={handleChange}
            >
              <option value="">Do you have professional certifications? *</option>
              <option>Yes</option>
              <option>No</option>
            </select>

            {formData.professionalCert === "Yes" && (
              <div className="certification-fields">
                <input 
                  className="form-input-full" 
                  name="certName" 
                  placeholder="Certificate Name *" 
                  required 
                  onChange={handleChange} 
                />
                <div className="form-row">
                  <select 
                    className="form-input" 
                    name="proficiency" 
                    required 
                    onChange={handleChange}
                  >
                    <option value="">Proficiency Level *</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                  <input 
                    className="form-input" 
                    name="certNumber" 
                    placeholder="Certificate Number *" 
                    required 
                    onChange={handleChange} 
                  />
                </div>
                <input 
                  className="form-input-full" 
                  type="date" 
                  name="issueDate" 
                  required 
                  onChange={handleChange} 
                />
              </div>
            )}
          </div>

          {/* ATTACHMENTS */}
          <div className="form-section">
            <h3 className="section-title">📎 Attachments</h3>
            
            <div className="file-upload-group">
              <label className="file-label">📷 Photo (JPG / PNG)</label>
              <input 
                className="form-file" 
                type="file" 
                accept="image/*" 
                required 
              />
            </div>

            <div className="file-upload-group">
              <label className="file-label">📄 Resume Name</label>
              <input 
                className="form-input-full" 
                name="resumeName" 
                placeholder="e.g., My Resume 2026 *" 
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="file-upload-group">
              <label className="file-label">📋 Resume (PDF / DOC / DOCX)</label>
              <input 
                className="form-file" 
                type="file" 
                accept=".pdf,.doc,.docx" 
                required 
              />
            </div>
          </div>

          {/* TERMS */}
          <div className="form-section">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="terms" 
                onChange={handleChange} 
                required
              />
              <span>I agree to the Terms & Conditions and Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            🚀 Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
