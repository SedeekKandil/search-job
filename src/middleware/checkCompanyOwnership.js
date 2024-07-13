import { Company } from "../../database/models/company.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../middleware/catchError.js";

export const checkCompanyOwnership = catchError(async (req, res, next) => {
    
    let company = await Company.findOne({ companyHr: req.user.userId });

    if (!company) {
        return next(new AppError("Company not found", 404));
    }

    if (company.companyHr.toString() !== req.user.userId) {
        return next(new AppError("You are not authorized to make any updates in jobs for this company", 403));
    }

    req.companyId = company._id;

    next();
});