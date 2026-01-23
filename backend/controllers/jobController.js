const Job = require('../models/Job');
const User = require('../models/User');

// ✅ Create Job (Employer Only)
exports.createJob = async (req, res) => {
  try {
    const { title, company, description, requirements, location, jobType, salary, experience, skills, postedBy } = req.body;

    // Validate required fields
    if (!title || !company || !description || !location || !jobType || !postedBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const job = new Job({
      title,
      company,
      description,
      requirements: requirements || [],
      location,
      jobType,
      salary: salary || {},
      experience: experience || 'Entry Level',
      skills: skills || [],
      postedBy,
    });

    await job.save();
    await job.populate('postedBy', 'firstName lastName email');

    res.status(201).json({
      message: 'Job created successfully',
      job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const { title, location, jobType, experience } = req.query;
    const filter = { status: 'open' };

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (jobType) filter.jobType = jobType;
    if (experience) filter.experience = experience;

    const jobs = await Job.find(filter)
      .populate('postedBy', 'firstName lastName company email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single Job
exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate('postedBy', 'firstName lastName company email phone')
      .populate('applications');

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({
      job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Job
exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { title, company, description, requirements, location, jobType, salary, experience, skills, status } = req.body;

    const job = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        company,
        description,
        requirements,
        location,
        jobType,
        salary,
        experience,
        skills,
        status,
      },
      { new: true, runValidators: true }
    ).populate('postedBy', 'firstName lastName email');

    res.status(200).json({
      message: 'Job updated successfully',
      job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({
      message: 'Job deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Search Jobs
exports.searchJobs = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: 'Search keyword is required' });
    }

    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { location: { $regex: keyword, $options: 'i' } },
      ],
      status: 'open',
    }).populate('postedBy', 'firstName lastName email');

    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Jobs Posted by User
exports.getJobsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const jobs = await Job.find({ postedBy: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Save Job
exports.saveJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ error: 'userId and jobId are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if job is already saved
    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ error: 'Job already saved' });
    }

    // Add job to saved jobs
    user.savedJobs.push(jobId);
    await user.save();

    res.status(200).json({
      message: 'Job saved successfully',
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Unsave Job
exports.unsaveJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ error: 'userId and jobId are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove job from saved jobs
    user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
    await user.save();

    res.status(200).json({
      message: 'Job unsaved successfully',
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Saved Jobs
exports.getSavedJobs = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('savedJobs');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Populate job details with company info
    const savedJobsWithDetails = await Promise.all(
      user.savedJobs.map(async (jobId) => {
        const job = await Job.findById(jobId).populate('postedBy', 'firstName lastName email company');
        return job;
      })
    );

    res.status(200).json({
      count: savedJobsWithDetails.length,
      savedJobs: savedJobsWithDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Check if Job is Saved
exports.isJobSaved = async (req, res) => {
  try {
    const { userId, jobId } = req.query;

    if (!userId || !jobId) {
      return res.status(400).json({ error: 'userId and jobId are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isSaved = user.savedJobs.includes(jobId);

    res.status(200).json({
      isSaved,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

