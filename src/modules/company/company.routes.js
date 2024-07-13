import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addCompany, deleteCompany, getApplicationsForJob, getCompanyInfo, searchWithCompanyName, updateCompany } from "./company.controller.js";
import { checkRole } from "../../middleware/checkRole.js";
import { validate } from "../../middleware/validate.js";
import { addCompanyVal, deleteCompanyVal, getApplicationsForJobVal, getCompanyInfoVal, searchWithCompanyNameVal, updateCompanyVal } from "./company.validation.js";
import { checkCompanyName } from "../../middleware/checkCompanyName.js";
import { checkCompanyOwner } from "../../middleware/checkCompanyOwner.js";
import { checkJobOwnership } from "../../middleware/checkAppsAndJobsOwners.js";


const companyRouter = Router()


companyRouter.post("/search",validate(searchWithCompanyNameVal),searchWithCompanyName)
companyRouter.use(verifyToken)
companyRouter.post("/",checkRole,validate(addCompanyVal),checkCompanyName,addCompany)
companyRouter.put("/:id",checkCompanyOwner,validate(updateCompanyVal),checkCompanyName,updateCompany)
companyRouter.delete("/:id",checkCompanyOwner,validate(deleteCompanyVal),deleteCompany)
companyRouter.get("/:id",checkCompanyOwner,validate(getCompanyInfoVal),getCompanyInfo)
companyRouter.get("/:companyId/jobs/:jobId/applications", checkJobOwnership,validate(getApplicationsForJobVal), getApplicationsForJob);






export default companyRouter