import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addApplication, getApplications } from "./application.controller.js";
import { checkRoleUser } from "../../middleware/checkRoleUser.js";
import { validate } from "../../middleware/validate.js";
import { applicationVal } from "./application.validation.js";
import { uploadSingleFile } from "../../file upload/fileUpload.js";
import { checkRole } from "../../middleware/checkRole.js";


const applicationRouter = Router()



applicationRouter.get("/",getApplications)
applicationRouter.use(verifyToken)
applicationRouter.post("/",checkRoleUser,uploadSingleFile('pdf'),validate(applicationVal),addApplication)





export default applicationRouter