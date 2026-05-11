import { Router } from "express";
import { postJob, getJobs, getOne, deleteJob } from "../controllers/jobControllers.js";



const jobRouter = Router();

jobRouter.post("/", postJob);

jobRouter.get("/", getJobs); 

jobRouter.get("/:id", getOne)
jobRouter.delete("/:id", deleteJob);

export default jobRouter;