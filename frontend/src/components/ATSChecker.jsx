import React, { useState, useEffect } from "react";

const ATSChecker = ({ resumeData }) => {
  const [atsScore, setAtsScore] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    calculateATSScore();
  }, [resumeData]);

  const calculateATSScore = () => {
    let score = 0;
    const feedbackItems = [];
    const suggestionItems = [];

    // Personal Information Check (15 points)
    if (resumeData.personalInfo.fullName) {
      score += 5;
    } else {
      feedbackItems.push({
        type: "error",
        message: "Missing full name - Required for ATS scanning"
      });
    }

    if (resumeData.personalInfo.email) {
      score += 5;
    } else {
      feedbackItems.push({
        type: "error",
        message: "Missing email address - Required for employer contact"
      });
    }

    if (resumeData.personalInfo.phone) {
      score += 5;
    } else {
      feedbackItems.push({
        type: "error",
        message: "Missing phone number - Recommended for ATS"
      });
    }

    // Professional Summary Check (10 points)
    if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50) {
      score += 10;
      feedbackItems.push({
        type: "success",
        message: "✓ Professional summary present and detailed"
      });
    } else if (resumeData.personalInfo.summary) {
      score += 5;
      suggestionItems.push(
        "Expand your professional summary to at least 100 words for better ATS matching"
      );
    } else {
      suggestionItems.push(
        "Add a professional summary highlighting your key strengths and career objectives"
      );
    }

    // Work Experience Check (20 points)
    if (resumeData.experience.length > 0) {
      score += 10;
      feedbackItems.push({
        type: "success",
        message: `✓ ${resumeData.experience.length} work experience entry/entries present`
      });

      let validExperiences = 0;
      resumeData.experience.forEach((exp) => {
        if (
          exp.jobTitle &&
          exp.company &&
          exp.startDate &&
          exp.description
        ) {
          validExperiences++;
        }
      });

      if (validExperiences > 0) {
        score += Math.min(validExperiences * 5, 10);
      }
    } else {
      suggestionItems.push(
        "Add at least one work experience entry to improve ATS compatibility"
      );
    }

    // Education Check (15 points)
    if (resumeData.education.length > 0) {
      score += 10;
      feedbackItems.push({
        type: "success",
        message: `✓ ${resumeData.education.length} education entry/entries present`
      });

      let validEducation = 0;
      resumeData.education.forEach((edu) => {
        if (edu.degree && edu.institution) {
          validEducation++;
        }
      });

      if (validEducation > 0) {
        score += Math.min(validEducation * 5, 5);
      }
    } else {
      feedbackItems.push({
        type: "error",
        message: "Missing education information - Important for ATS matching"
      });
    }

    // Skills Check (20 points)
    if (resumeData.skills.length > 0) {
      score += 10;
      feedbackItems.push({
        type: "success",
        message: `✓ ${resumeData.skills.length} skill/skills added`
      });

      let validSkills = resumeData.skills.filter((s) => s.skill.trim().length > 0)
        .length;
      if (validSkills > 5) {
        score += 10;
        feedbackItems.push({
          type: "success",
          message: "✓ Good number of skills for ATS parsing"
        });
      } else if (validSkills > 0) {
        score += 5;
        suggestionItems.push(
          `Add more skills (you have ${validSkills}, aim for at least 6-10) to improve keyword matching`
        );
      }
    } else {
      suggestionItems.push(
        "Add at least 6-10 relevant skills to improve ATS keyword matching"
      );
    }

    // Projects Check (10 points)
    if (resumeData.projects.length > 0) {
      score += Math.min(resumeData.projects.length * 3, 10);
      feedbackItems.push({
        type: "success",
        message: `✓ ${resumeData.projects.length} project(s) included - Great for showcasing practical experience`
      });
    } else {
      suggestionItems.push(
        "Consider adding 1-3 projects to demonstrate practical application of your skills"
      );
    }

    // Format and Keyword Check (10 points)
    const fullText = generateResumeText();
    const keywordScore = checkKeywords(fullText);
    score += keywordScore;

    // Calculate final score
    const finalScore = Math.min(Math.round(score), 100);
    setAtsScore(finalScore);
    setFeedback(feedbackItems);
    setSuggestions(suggestionItems);
  };

  const generateResumeText = () => {
    let text = "";
    text += resumeData.personalInfo.fullName + " ";
    text += resumeData.personalInfo.summary + " ";

    resumeData.experience.forEach((exp) => {
      text += exp.jobTitle + " " + exp.company + " " + exp.description + " ";
    });

    resumeData.education.forEach((edu) => {
      text += edu.degree + " " + edu.institution + " " + edu.field + " ";
    });

    resumeData.skills.forEach((skill) => {
      text += skill.skill + " ";
    });

    resumeData.projects.forEach((proj) => {
      text += proj.projectName + " " + proj.description + " " + proj.technologies + " ";
    });

    return text.toLowerCase();
  };

  const checkKeywords = (text) => {
    const keywords = [
      "achieved",
      "developed",
      "implemented",
      "managed",
      "led",
      "created",
      "designed",
      "improved",
      "optimized",
      "delivered",
      "collaborated"
    ];

    let keywordCount = 0;
    keywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        keywordCount++;
      }
    });

    return Math.min(keywordCount * 2, 10);
  };

  const getScoreColor = () => {
    if (atsScore >= 80) return "#27AE60";
    if (atsScore >= 60) return "#F39C12";
    return "#E74C3C";
  };

  const getScoreLabel = () => {
    if (atsScore >= 80) return "Excellent";
    if (atsScore >= 60) return "Good";
    if (atsScore >= 40) return "Fair";
    return "Poor";
  };

  return (
    <div className="ats-checker-container">
      <div className="ats-header">
        <h2>ATS Score Check</h2>
        <p>
          Get your resume's ATS (Applicant Tracking System) compatibility score
        </p>
      </div>

      <div className="ats-content">
        {/* Score Display */}
        <div className="score-card">
          <div className="score-circle" style={{ borderColor: getScoreColor() }}>
            <div className="score-value" style={{ color: getScoreColor() }}>
              {atsScore}
            </div>
            <div className="score-label" style={{ color: getScoreColor() }}>
              {getScoreLabel()}
            </div>
          </div>

          <div className="score-info">
            <h3>Your ATS Score</h3>
            <p>
              This score indicates how well your resume is optimized for ATS systems
              used by recruiters.
            </p>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: `${atsScore}%`, backgroundColor: getScoreColor() }}
              ></div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="feedback-section">
          <h3>📋 Feedback</h3>
          {feedback.length > 0 ? (
            <div className="feedback-list">
              {feedback.map((item, index) => (
                <div key={index} className={`feedback-item feedback-${item.type}`}>
                  <span className="feedback-icon">
                    {item.type === "success" ? "✓" : "!"}
                  </span>
                  <p>{item.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-feedback">No issues found!</p>
          )}
        </div>

        {/* Suggestions */}
        <div className="suggestions-section">
          <h3>💡 Suggestions to Improve Your Score</h3>
          {suggestions.length > 0 ? (
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <span className="suggestion-number">{index + 1}</span>
                  <p>{suggestion}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-suggestions">Great! No suggestions at the moment.</p>
          )}
        </div>

        {/* ATS Tips */}
        <div className="tips-section">
          <h3>🎯 ATS Optimization Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>📝 Use Standard Formatting</h4>
              <p>Avoid tables, graphics, and unusual fonts. ATS systems parse plain text.</p>
            </div>
            <div className="tip-card">
              <h4>🔑 Include Keywords</h4>
              <p>
                Use keywords from the job description. ATS systems scan for relevant terms.
              </p>
            </div>
            <div className="tip-card">
              <h4>✍️ Use Action Verbs</h4>
              <p>
                Start bullet points with strong action verbs like "Developed," "Led," "Managed."
              </p>
            </div>
            <div className="tip-card">
              <h4>📄 Keep It Simple</h4>
              <p>
                Avoid headers, footers, and page breaks. ATS may struggle parsing complex layouts.
              </p>
            </div>
            <div className="tip-card">
              <h4>🎓 Include All Sections</h4>
              <p>
                Contact, Summary, Experience, Education, Skills, and Projects help ATS matching.
              </p>
            </div>
            <div className="tip-card">
              <h4>📊 Quantify Achievements</h4>
              <p>
                Use numbers and percentages. "Increased sales by 25%" is better than "Improved sales."
              </p>
            </div>
          </div>
        </div>

        {/* Common Keywords */}
        <div className="keywords-section">
          <h3>⭐ Common ATS Keywords</h3>
          <div className="keywords-list">
            <div className="keyword-group">
              <h4>Action Verbs</h4>
              <div className="keywords">
                {[
                  "Achieved",
                  "Developed",
                  "Implemented",
                  "Managed",
                  "Led",
                  "Created",
                  "Designed",
                  "Improved",
                  "Optimized",
                  "Delivered"
                ].map((keyword, index) => (
                  <span key={index} className="keyword">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="keyword-group">
              <h4>Technical Skills</h4>
              <div className="keywords">
                {[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Python",
                  "SQL",
                  "AWS",
                  "Docker",
                  "Git",
                  "MongoDB",
                  "REST API"
                ].map((keyword, index) => (
                  <span key={index} className="keyword">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSChecker;
