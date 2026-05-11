import { useEffect, useState, useCallback } from "react";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import EmployerDashboard from "../pages/EmployerDashboard";
import AdminDashboard from "../pages/AdminDasboard";
import { useAuthStore } from "../store/useAuthStore";
import type { Job } from "../types/job";
import api from "../api/axiosInstance";
import { PageLoader } from "../Ui/pageLoader";

interface ApiJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  skills: string[];
  salary: number;
  jobType: string;
  category: string;
  description?: string;
  createdBy: string;
  workImages?: string[];
}

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Cleaner API call using abstracted instance
      const res = await api.get<ApiJob[]>("/jobs");
      
      // Transform data to match frontend requirements
      const formattedJobs: Job[] = res.data.map((job) => ({
        id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        duration: job.duration,
        skills: job.skills,
        pay: job.salary,
        employmentType: job.jobType,
        type: job.category,
        description: job.description ?? "",
        createdBy: job.createdBy,
        workImages: job.workImages ?? [],
      }));

      setJobs(formattedJobs);
    } catch (err: any) {
      console.error("Error fetching jobs", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) {
    return <PageLoader label="Loading requests" fullScreen={false} />;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button 
          onClick={fetchJobs}
          className="px-4 py-2 bg-amber-500 rounded text-white hover:bg-amber-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) return null;

  return user.role === "employer" ? (
    <EmployerDashboard jobs={jobs} onRefresh={fetchJobs} />
  ) : user.role === "admin" ? (
    <AdminDashboard  />
  ) : (
    <EmployeeDashboard jobs={jobs} onRefresh={fetchJobs} />
  );
};

export default Dashboard;
