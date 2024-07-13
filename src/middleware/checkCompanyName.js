import bcrypt from "bcrypt"
import { AppError } from "../utils/appError.js"
import { Company } from "../../database/models/company.model.js"


export const checkCompanyName = async (req,res,next)=>{

    let isCompanyFound = await Company.findOne({companyName:req.body.companyName})
    if(isCompanyFound){
        return next(new AppError("company name already exist",409))
    }

    let isCompanyEmailFound = await Company.findOne({companyEmail:req.body.companyEmail})
    if(isCompanyEmailFound){
        return next(new AppError("company email already exist",409))
    }

    next()
}