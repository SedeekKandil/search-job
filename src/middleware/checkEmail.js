import bcrypt from "bcrypt"
import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/appError.js"


export const checkEmail = async (req,res,next)=>{

    let isEmailFound = await User.findOne({email:req.body.email})
    if(isEmailFound){
        return next(new AppError("email already exist",409))
    }

    let isMobileNumberFound = await User.findOne({mobileNumber:req.body.mobileNumber})
    if(isMobileNumberFound){
        return next(new AppError("phone number already exist",409))
    }

    req.body.password = bcrypt.hashSync(req.body.password,8)

    next()
}