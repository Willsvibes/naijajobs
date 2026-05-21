import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "../api/axiosInstance";
import type { Job } from "../types/job";
import type { ApplicationStatus } from "../types/application";
import { EmployerHeader } from "./employer/EmployerHeader";
import { EmployerStats } from "./employer/EmployerStats";
import { OffersDrawer } from "./employer/OffersDrawer";
import { RequestGrid } from "./employer/RequestGrid";
import { statusConfig } from "./employer/statusConfig";
import type { EmployerApplication, EmployerDashboardProps } from "./employer/types";

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ jobs, onRefresh }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<EmployerApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [jobs, searchQuery]
  );

  const fetchApplications = async (jobId: string | number) => {
    try {
      setLoadingApps(true);
      const res = await api.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch {
      toast.error("Failed to load offers");
    } finally {
      setLoadingApps(false);
    }
  };

  const handleViewApplications = (job: Job) => {
    setSelectedJob(job);
    fetchApplications(job.id);
  };

  const updateStatus = async (applicationId: string, status: ApplicationStatus) => {
    try {
      setUpdatingId(applicationId);
      await api.patch(`/applications/${applicationId}/status`, { status });
      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId ? { ...application, status } : application
        )
      );
      toast.success(`Offer ${statusConfig[status].label.toLowerCase()}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 pb-20">
      <div className="fixed inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-10">
        <EmployerHeader
          onPostRequest={() => navigate("/post")}
          onViewOffers={() => navigate("/offers")}
        />

        <EmployerStats jobs={jobs} />

        <RequestGrid
          jobs={filteredJobs}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onViewOffers={handleViewApplications}
          onPostRequest={() => navigate("/post")}
          onRefresh={onRefresh}
        />
      </div>

      {selectedJob && (
        <OffersDrawer
          selectedJob={selectedJob}
          applications={applications}
          loadingApps={loadingApps}
          updatingId={updatingId}
          onClose={() => setSelectedJob(null)}
          onUpdateStatus={updateStatus}
        />
      )}
    </div>
  );
};

export default EmployerDashboard;
