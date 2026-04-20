import { Router } from "express";
import { postJob, getJobs, getOne } from "../controllers/jobControllers";



const jobRouter = Router();

jobRouter.post("/", postJob);

jobRouter.get("/", getJobs); 

jobRouter.get("/:id", getOne)

export default jobRouter;