import { Company } from "../../database/models/company.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "./catchError.js";

export const checkCompanyOwner = catchError(async (req, res, next) => {
    let company = await Company.findById(req.params.id);
    
    if (!company) {
        return next(new AppError('Company not found', 404));
    }

    if (!company.companyHr) {
        return next(new AppError('Company owner information is missing', 500));
    }

    if (!company.companyHr.equals(req.user.userId)) {
        return next(new AppError('You are not the owner of this company', 403));
    }

    next();
});