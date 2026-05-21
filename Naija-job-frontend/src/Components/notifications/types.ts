import type { ApplicationStatus } from "../../types/application";

export interface Notification {
  _id: string;
  type:
    | "new_application"
    | "application_update"
    | "new_job_posted"
    | "new_user_registered";
  message: string;
  read: boolean;
  createdAt: string;
  sender: { name: string; email: string };
  job?: { title: string; company: string; workImages?: string[] };
  application?: {
    _id: string;
    proposal?: string;
    portfolioImages?: string[];
    status: ApplicationStatus;
  };
}
