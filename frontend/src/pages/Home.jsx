import React, { useState } from "react";

/* Search Job Section Component */
const SearchJobSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in", location);
    // Example:
    // window.location.href = `/jobs?query=${searchTerm}&location=${location}`;
  };

  return (
    <section className="search-job">
      <div className="search-container">
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="location-dropdown"
        >
          <option value="">Select Location</option>
          <option value="new-york">New York</option>
          <option value="san-francisco">San Francisco</option>
          <option value="london">London</option>
          <option value="remote">Remote</option>
        </select>

        <button onClick={handleSearch} className="search-btn">
          Search Jobs
        </button>
      </div>
    </section>
  );
};

/* Homepage Component */
const Homepage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-heading">Find Your Dream Job Today</h1>
          <p className="hero-description">
            Connect with top employers and discover opportunities tailored to your skills.
            Whether you're a job seeker or an employee looking to advance, our platform
            makes it easy to find the perfect match.
          </p>
          <button
            className="find-jobs-btn"
            onClick={() => (window.location.href = "/jobs")}
          >
            Find Jobs
          </button>
        </div>
      </section>

      {/* Search Section */}
      <SearchJobSection />
    </div>
  );
};

export default Homepage;
