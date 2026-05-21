export interface ProfileData {
  name: string;
  email: string;
  role: "employee" | "employer" | "admin";
  skills?: string[];
  companyName?: string;
  bio?: string;
}

export interface ProfileFormState {
  name: string;
  skills: string[];
  companyName: string;
  bio: string;
}
