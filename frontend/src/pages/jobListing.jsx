import React, { useState } from 'react';
import './style.css'; // Assuming you have a CSS file for custom styles
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
const JobListing = () => {
  // State for search inputs
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  // State for filters
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryRange, setSalaryRange] = useState('');

  // Expanded dummy job data (at least 5 jobs with varying filters)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'New York, NY',
      description: 'Develop and maintain web applications using modern technologies.',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$80k - $100k'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Data Inc',
      location: 'San Francisco, CA',
      description: 'Analyze data and generate insights for business decisions.',
      type: 'Part-time',
      experience: 'Entry-level',
      salary: '$50k - $70k'
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Web Solutions',
      location: 'Austin, TX',
      description: 'Build responsive user interfaces with React and CSS.',
      type: 'Full-time',
      experience: 'Senior-level',
      salary: '$100k+'
    },
    {
      id: 4,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'Los Angeles, CA',
      description: 'Design user experiences for web and mobile applications.',
      type: 'Part-time',
      experience: 'Mid-level',
      salary: '$70k - $90k'
    },
    {
      id: 5,
      title: 'Backend Engineer',
      company: 'Server Tech',
      location: 'Seattle, WA',
      description: 'Develop server-side logic and APIs for scalable applications.',
      type: 'Full-time',
      experience: 'Entry-level',
      salary: '$60k - $80k'
    },
    {
      id: 6,
      title: 'Product Manager',
      company: 'Innovate Ltd',
      location: 'Chicago, IL',
      description: 'Oversee product development from ideation to launch.',
      type: 'Full-time',
      experience: 'Senior-level',
      salary: '$100k+'
    }
  ]);

  // Filtered jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    return (
      (jobTitle === '' || job.title.toLowerCase().includes(jobTitle.toLowerCase())) &&
      (location === '' || job.location.toLowerCase().includes(location.toLowerCase())) &&
      (jobType === '' || job.type === jobType) &&
      (experienceLevel === '' || job.experience === experienceLevel) &&
      (salaryRange === '' || job.salary === salaryRange)
    );
  });

  // Handle search (could trigger API call)
  const handleSearch = () => {
    // In a real app, fetch jobs based on filters
    console.log('Searching with:', { jobTitle, location, jobType, experienceLevel, salaryRange });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setJobTitle('');
    setLocation('');
    setJobType('');
    setExperienceLevel('');
    setSalaryRange('');
  };

  // Handle view more (load more jobs)
  const handleViewMore = () => {
    // In a real app, fetch more jobs
    console.log('Loading more jobs...');
  };

  return (
    <div className="job-listing-container">
      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>

      {/* Filter Panel */}
      <div className="filter-panel">
        <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="filter-select">
          <option value="">Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className="filter-select">
          <option value="">Experience Level</option>
          <option value="Entry-level">Entry-level</option>
          <option value="Mid-level">Mid-level</option>
          <option value="Senior-level">Senior-level</option>
        </select>
        <select value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} className="filter-select">
          <option value="">Salary Range</option>
          <option value="$50k - $70k">$50k - $70k</option>
          <option value="$70k - $90k">$70k - $90k</option>
          <option value="$80k - $100k">$80k - $100k</option>
          <option value="$100k+">$100k+</option>
        </select>
        <button onClick={handleClearFilters} className="clear-btn">Clear Filters</button>
      </div>

      {/* Job List */}
      <div className="job-list">
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* View More Button */}
      <div className="view-more-container">
        <button onClick={handleViewMore} className="view-more-btn">View More</button>
      </div><br/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// JobCard Component
const JobCard = ({ job }) => {
    const navigate = useNavigate();
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company"><strong>Company:</strong> {job.company}</p>
      <p className="job-location"><strong>Location:</strong> {job.location}</p>
      <p className="job-description">{job.description}</p>
      <div className='job-buttons'>
      <button className="apply-btn btn">Apply</button>
      <button className="view-btn btn" onClick={() => navigate(`/jobs/${job.id}`)}>View Details</button>
      </div>
    </div>
  );
};

export default JobListing;