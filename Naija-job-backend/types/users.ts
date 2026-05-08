export type UserRole = "employee" | "employer" | "admin";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  banned?: boolean;
}