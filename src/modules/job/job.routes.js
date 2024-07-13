import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addJob, deleteJob, getAllJobsByCompanyName, getAllJobsWithCompanyInfo, getFilteredJobs, updateJob } from "./job.controller.js";
import { validate } from "../../middleware/validate.js";
import { addJobVal, deleteJobVal, getAllJobsByCompanyNameVal, getFilteredJobsVal, updateJobVal } from "./job.validation.js";
import { checkRole } from "../../middleware/checkRole.js";
import { checkCompanyOwnership } from "../../middleware/checkCompanyOwnership.js";
import { checkJobOwner } from "../../middleware/checkJobOwner.js";



const jobRouter = Router()



jobRouter.use(verifyToken)
jobRouter.post("/",checkRole,validate(addJobVal),checkCompanyOwnership,addJob)
jobRouter.put("/:id",checkRole,validate(updateJobVal),checkJobOwner,updateJob)
jobRouter.delete("/:id",checkRole,validate(deleteJobVal),checkJobOwner,deleteJob)
jobRouter.get("/",getAllJobsWithCompanyInfo)
jobRouter.get("/companyName",validate(getAllJobsByCompanyNameVal),getAllJobsByCompanyName)
jobRouter.get("/filter",validate(getFilteredJobsVal),getFilteredJobs)






export default jobRouter