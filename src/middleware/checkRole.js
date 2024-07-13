import { AppError } from "../utils/appError.js";
import { catchError } from "./catchError.js";


export const checkRole = catchError(async(req,res,next) =>{


    if (req.user.role !== "company_HR") {
        return next(new AppError('You are not authorized to this role', 403));
    }

    next()
})