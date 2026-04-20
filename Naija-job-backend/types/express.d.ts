import { IUser } from "./users";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {}