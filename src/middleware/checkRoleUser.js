import { AppError } from "../utils/appError.js";
import { catchError } from "./catchError.js";


export const checkRoleUser = catchError(async(req,res,next) =>{


    if (req.user.role !== "user") {
        return next(new AppError('You are not authorized to do this action', 403));
    }

    next()
})