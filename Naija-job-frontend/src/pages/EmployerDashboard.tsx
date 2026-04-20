
import React from "react";
import type { Job } from "../types/job";
import JobCard from "../Components/JobCard";
import { useNavigate } from "react-router";

interface Props {
  jobs: Job[];
}

const EmployerDashboard: React.FC<Props> = ({ jobs }) => {
  const navigate = useNavigate();
 const handleCreateJob = () => 
    navigate("/post")
 
  return (
    <div className="p-6 text-white min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

      <button 
      onClick={handleCreateJob}
      className="bg-amber-500 px-4 py-2 rounded mb-6">
        + Create Job
      </button>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className="text-slate-400 col-span-full">You have no job posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;