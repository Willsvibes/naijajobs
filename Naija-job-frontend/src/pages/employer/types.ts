import type { Job } from "../../types/job";
import type { ApplicationStatus } from "../../types/application";

export interface EmployerApplication {
  _id: string;
  status: ApplicationStatus;
  proposal?: string;
  portfolioImages?: string[];
  createdAt: string;
  applicant: {
    _id: string;
    name: string;
    email: string;
    skills?: string[];
    bio?: string;
  };
}

export interface EmployerDashboardProps {
  jobs: Job[];
  onRefresh?: () => void;
}
