
import { useEffect, useState } from "react";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import EmployerDashboard from "../pages/EmployerDashboard";
import { useAuth } from "../Hooks/authContext";
import type { Job } from "../types/job";

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
}

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchJobs = async () => {
      setLoading(true);
      try {
        
        const url =
          user.role === "employee"
            ? "http://localhost:5000/api/jobs"
            : `http://localhost:5000/api/jobs`;
        // const url =
        //   user.role === "employee"
        //     ? "http://localhost:5000/api/jobs"
        //     : `http://localhost:5000/api/jobs?employerId=${user.id}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data: ApiJob[] = await res.json();

        // Map backend jobs to frontend Job type
        const formattedJobs: Job[] = data.map((job) => ({
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
        }));

        setJobs(formattedJobs);
      } catch (err) {
        console.error("Error fetching jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  if (!user || loading)
    return <p className="text-white p-6">Loading...</p>;

  // Render based on role
  return user.role === "employer" ? (
    <EmployerDashboard jobs={jobs} />
  ) : (
    <EmployeeDashboard jobs={jobs} />
  );
};

export default Dashboard;