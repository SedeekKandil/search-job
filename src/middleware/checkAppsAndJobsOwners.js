import { Job } from "../../database/models/job.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "./catchError.js";

export const checkJobOwnership = catchError(async (req, res, next) => {
    const { companyId, jobId } = req.params;
    const userId = req.user.userId;

    
    const job = await Job.findById(jobId).populate('addedBy');

    if (!job) {
        return next(new AppError('Job not found', 404));
    }

    if (!job.addedBy || !job.addedBy.equals(userId)) {
        return next(new AppError('You are not the owner of this job', 403));
    }

    req.job = job;
    next();
});
