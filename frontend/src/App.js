import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Homepage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PassForget from "./components/PassForget";
import JobListing from "./pages/jobListing";
import JobDetails from "./pages/JobDetails";
import ApplyForm from "./pages/ApplyForm";
import Prepare from "./pages/Prepare";
import PrepResume from "./pages/PrepResume";
import ViewProfile from "./components/ViewProfile";
import AppliedJobs from "./components/AppliedJobs";
import SavedJobs from "./components/SavedJobs";

import "./App.css";


function App() {
  return (
    <Routes>
      {/* Pages WITH Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/jobs" element={<JobListing />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/apply/:jobId" element={<ApplyForm />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/prepare-resume" element={<PrepResume />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
      

      </Route>

      {/* Pages WITHOUT Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<PassForget />} />
    </Routes>
  );
}

export default App;
