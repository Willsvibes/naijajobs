import type { ApplicationStatus } from "../../types/application";

export interface Offer {
  _id: string;
  proposal?: string;
  portfolioImages: string[];
  status: ApplicationStatus;
  createdAt: string;
  applicant: {
    _id: string;
    name: string;
    email: string;
    skills?: string[];
    bio?: string;
  } | null;
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: number;
    category: string;
    jobType: string;
    workImages?: string[];
  } | null;
}
