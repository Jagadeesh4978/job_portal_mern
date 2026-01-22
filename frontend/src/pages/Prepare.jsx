import React, { useState } from "react";
import Footer from "../components/Footer";
import "./style.css";

const Prepare = () => {
  const [activeTab, setActiveTab] = useState("aptitude");
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [visibleCount, setVisibleCount] = useState({
    aptitude: 3,
    interview: 3,
    company: 3
  });

  const questionsPerPage = 3;

  // Aptitude Questions
  const aptitudeQuestions = [
    {
      id: 1,
      question: "If a = 5 and b = 3, what is the value of (a + b) * 2?",
      answer: "(5 + 3) * 2 = 8 * 2 = 16",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "What is the square root of 144?",
      answer: "The square root of 144 is 12, because 12 × 12 = 144",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "If a pipe fills a tank in 6 hours and another pipe fills it in 8 hours, how long does it take to fill the tank if both pipes work together?",
      answer: "Combined rate = 1/6 + 1/8 = 7/24 tanks per hour. Time = 24/7 ≈ 3.43 hours",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "A man travels 50 km at 40 km/h and 50 km at 60 km/h. What is his average speed?",
      answer: "Total distance = 100 km. Time 1 = 50/40 = 1.25 hours. Time 2 = 50/60 = 0.83 hours. Average speed = 100/2.08 ≈ 48 km/h",
      difficulty: "Medium"
    },
    {
      id: 5,
      question: "If 30% of x is 90, what is x?",
      answer: "30/100 * x = 90. x = 90 * 100/30 = 300",
      difficulty: "Easy"
    },
    {
      id: 6,
      question: "What is the LCM of 12, 18, and 24?",
      answer: "Prime factors: 12=2²×3, 18=2×3², 24=2³×3. LCM = 2³×3² = 8×9 = 72",
      difficulty: "Medium"
    },
    {
      id: 7,
      question: "If the ratio of A:B is 3:5 and A = 18, what is B?",
      answer: "A:B = 3:5. If A = 18, then 3 units = 18, so 1 unit = 6. Therefore B = 5 × 6 = 30",
      difficulty: "Easy"
    },
    {
      id: 8,
      question: "A number is increased by 25%. If the new number is 250, what was the original number?",
      answer: "Original number × 1.25 = 250. Original number = 250/1.25 = 200",
      difficulty: "Medium"
    },
    {
      id: 9,
      question: "What is the compound interest on $1000 at 5% per annum for 2 years?",
      answer: "Amount = P(1 + r/100)ⁿ = 1000(1.05)² = 1000 × 1.1025 = $1102.50. CI = $102.50",
      difficulty: "Hard"
    }
  ];

  // Interview Questions
  const interviewQuestions = [
    {
      id: 1,
      question: "Tell me about yourself.",
      answer: "Provide a brief overview of your background, education, experience, and skills. Focus on what's relevant to the position. Typically 1-2 minutes.",
      difficulty: "Easy",
      company: "Common"
    },
    {
      id: 2,
      question: "What are your strengths and weaknesses?",
      answer: "Strengths: Mention 2-3 genuine strengths with examples. Weaknesses: Choose a real weakness but focus on how you're improving it. Be honest but positive.",
      difficulty: "Medium",
      company: "Common"
    },
    {
      id: 3,
      question: "Why do you want to join our company?",
      answer: "Research the company beforehand. Mention specific projects, values, or culture that appeal to you. Show genuine interest and alignment with company goals.",
      difficulty: "Medium",
      company: "Common"
    },
    {
      id: 4,
      question: "Describe a challenging project you worked on and how you handled it.",
      answer: "Use the STAR method (Situation, Task, Action, Result). Provide specific examples with metrics. Focus on problem-solving and teamwork.",
      difficulty: "Medium",
      company: "Common"
    },
    {
      id: 5,
      question: "Where do you see yourself in 5 years?",
      answer: "Show ambition and growth mindset. Align your goals with company opportunities. Be realistic and mention skill development and career progression.",
      difficulty: "Easy",
      company: "Common"
    },
    {
      id: 6,
      question: "What are your salary expectations?",
      answer: "Do research on industry standards. Provide a range based on experience and location. Be flexible and focus on value you bring.",
      difficulty: "Medium",
      company: "Common"
    },
    {
      id: 7,
      question: "Tell me about a time you failed and what you learned from it.",
      answer: "Choose a real failure but focus on lessons learned. Show growth mindset and how the experience made you better. Be honest and reflective.",
      difficulty: "Medium",
      company: "Common"
    },
    {
      id: 8,
      question: "How do you handle stress and pressure at work?",
      answer: "Describe healthy coping strategies: prioritization, communication, time management, and seeking support. Give a specific example.",
      difficulty: "Easy",
      company: "Common"
    },
    {
      id: 9,
      question: "What do you know about our company?",
      answer: "Research the company thoroughly: mission, values, recent news, products/services, competitors. Show genuine interest and knowledge.",
      difficulty: "Medium",
      company: "Common"
    }
  ];

  // Company Previous Asked Questions
  const companyQuestions = [
    {
      id: 1,
      company: "Google",
      question: "Design an elevator system for a building with 50 floors and 10 elevators.",
      answer: "Discuss algorithms for elevator scheduling, load balancing, optimization techniques, and system design considerations.",
      difficulty: "Hard"
    },
    {
      id: 2,
      company: "Amazon",
      question: "How would you design a system like Amazon's recommendation engine?",
      answer: "Cover data collection, machine learning algorithms, scalability, real-time processing, and performance metrics.",
      difficulty: "Hard"
    },
    {
      id: 3,
      company: "Microsoft",
      question: "Reverse a string using recursion in your preferred programming language.",
      answer: "Write a recursive function that takes a string as input and returns the reversed string using base case and recursive calls.",
      difficulty: "Medium"
    },
    {
      id: 4,
      company: "Facebook (Meta)",
      question: "Design a real-time messaging system for millions of users.",
      answer: "Discuss architecture, databases, message delivery, scaling, load balancing, and real-time synchronization.",
      difficulty: "Hard"
    },
    {
      id: 5,
      company: "Apple",
      question: "What are the key considerations when designing iOS apps?",
      answer: "Cover memory management, battery optimization, UI/UX best practices, security, and App Store guidelines.",
      difficulty: "Medium"
    },
    {
      id: 6,
      company: "LinkedIn",
      question: "How would you design a system to find connections between users?",
      answer: "Discuss graph theory, algorithms for relationship mapping, scalability, and optimization techniques.",
      difficulty: "Hard"
    },
    {
      id: 7,
      company: "Netflix",
      question: "How would you design a video streaming system that handles millions of concurrent users?",
      answer: "Cover CDN optimization, adaptive bitrate streaming, caching strategies, load balancing, and fault tolerance.",
      difficulty: "Hard"
    },
    {
      id: 8,
      company: "Uber",
      question: "Design a real-time ride-matching algorithm for Uber.",
      answer: "Discuss geographic partitioning, demand prediction, surge pricing, matching algorithms, and real-time updates.",
      difficulty: "Hard"
    },
    {
      id: 9,
      company: "Twitter",
      question: "How would you design a feed ranking system for millions of tweets?",
      answer: "Discuss relevance scoring, personalization, engagement metrics, real-time updates, and scalability.",
      difficulty: "Hard"
    }
  ];

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const handleSeeMore = () => {
    setVisibleCount({
      ...visibleCount,
      [activeTab]: visibleCount[activeTab] + questionsPerPage
    });
  };

  const renderQuestions = (questions) => {
    const visibleQuestions = questions.slice(0, visibleCount[activeTab]);
    const hasMore = questions.length > visibleCount[activeTab];

    return (
      <>
        <div className="questions-container">
          {visibleQuestions.map((q) => (
            <div key={q.id} className="question-card">
              <div
                className="question-header"
                onClick={() => toggleQuestion(q.id)}
              >
                <div className="question-title">
                  <span className={`difficulty ${q.difficulty?.toLowerCase() || ""}`}>
                    {q.difficulty || q.company}
                  </span>
                  <p>{q.question}</p>
                </div>
                <span className={`toggle-icon ${expandedQuestion === q.id ? "open" : ""}`}>
                  ▼
                </span>
              </div>
              {expandedQuestion === q.id && (
                <div className="question-answer">
                  <strong>Answer:</strong>
                  <p>{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="see-more-wrapper">
            <button className="see-more-btn" onClick={handleSeeMore}>
              See More Questions
            </button>
            <p className="showing-count">
              Showing {visibleQuestions.length} of {questions.length} questions
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="prepare-page">
      {/* Hero Section */}
      <section className="prepare-hero">
        <div className="prepare-hero-content">
          <h1>Interview Preparation Hub</h1>
          <p>Master your interview skills with curated questions and answers</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="prepare-container">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "aptitude" ? "active" : ""}`}
            onClick={() => setActiveTab("aptitude")}
          >
            📊 Aptitude Questions
          </button>
          <button
            className={`tab-btn ${activeTab === "interview" ? "active" : ""}`}
            onClick={() => setActiveTab("interview")}
          >
            💬 Interview Questions
          </button>
          <button
            className={`tab-btn ${activeTab === "company" ? "active" : ""}`}
            onClick={() => setActiveTab("company")}
          >
            🏢 Company Questions
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "aptitude" && (
            <div className="content-section">
              <h2>Aptitude Questions</h2>
              <p className="section-description">
                Practice quantitative aptitude and reasoning questions to prepare for assessments.
              </p>
              {renderQuestions(aptitudeQuestions)}
            </div>
          )}

          {activeTab === "interview" && (
            <div className="content-section">
              <h2>Common Interview Questions</h2>
              <p className="section-description">
                Prepare for frequently asked interview questions across all companies.
              </p>
              {renderQuestions(interviewQuestions)}
            </div>
          )}

          {activeTab === "company" && (
            <div className="content-section">
              <h2>Company-Specific Questions</h2>
              <p className="section-description">
                Learn about questions previously asked by top tech companies.
              </p>
              {renderQuestions(companyQuestions)}
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <section className="tips-section">
        <h2>Interview Preparation Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>📝 Practice Regularly</h3>
            <p>Spend at least 30 minutes daily practicing questions and reviewing answers.</p>
          </div>
          <div className="tip-card">
            <h3>🔍 Research Companies</h3>
            <p>Learn about the company's mission, values, and recent projects before the interview.</p>
          </div>
          <div className="tip-card">
            <h3>💡 Use STAR Method</h3>
            <p>Structure your answers using Situation, Task, Action, and Result framework.</p>
          </div>
          <div className="tip-card">
            <h3>🎯 Mock Interviews</h3>
            <p>Practice with friends or use online platforms to simulate real interview scenarios.</p>
          </div>
          <div className="tip-card">
            <h3>😌 Stay Calm</h3>
            <p>Take deep breaths, think before answering, and communicate clearly and confidently.</p>
          </div>
          <div className="tip-card">
            <h3>❓ Ask Questions</h3>
            <p>Prepare thoughtful questions to ask the interviewer to show genuine interest.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Prepare;
