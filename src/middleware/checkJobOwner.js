import { Job } from "../../database/models/job.model.js";
import { Company } from "../../database/models/company.model.js";
import { catchError } from "../middleware/catchError.js";
import { AppError } from "../utils/appError.js";

export const checkJobOwner = catchError(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.userId; 

    const job = await Job.findById(id);
    if (!job) {
        return next(new AppError("Job not found", 404));
    }

    const company = await Company.findById(job.addedBy);
    if (!company) {
        return next(new AppError("Company not found", 404));
    }

    if (!company.companyHr.equals(userId)) {
        return next(new AppError("You are not authorized to delete this job", 403));
    }

    next();
});