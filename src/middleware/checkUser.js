import { AppError } from "../utils/appError.js";


export const checkUser = (req,res,next) =>{


    if (req.user.userId !== req.params.id) {
        return next(new AppError('You are not authorized to update this user', 403));
    }

    next()
}