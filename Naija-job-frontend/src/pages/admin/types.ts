export interface Stats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  employers: number;
  employees: number;
  bannedUsers: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "employee" | "employer" | "admin";
  banned: boolean;
  createdAt: string;
}

export interface AdminJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  jobType: string;
  category: string;
  createdAt: string;
  createdBy?: { name?: string; email?: string };
}

export interface AdminNotification {
  _id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export type AdminTab = "overview" | "users" | "jobs" | "notifications";
