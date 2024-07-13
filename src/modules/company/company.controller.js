import { Application } from "../../../database/models/application.model.js";
import { Company } from "../../../database/models/company.model.js"
import { Job } from "../../../database/models/job.model.js";
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js";


const addCompany = catchError(async (req,res)=>{
    req.body.companyHr = req.user.userId;
    let company = await Company.insertMany(req.body)
    res.status(201).json({message:"success", company})
})


const updateCompany = catchError(async (req,res,next)=>{

    let company = await Company.findByIdAndUpdate(req.params.id, req.body, {new:true})
    company.password = undefined;
    if(!company) return next(new AppError("company not found",404)) 
    res.status(200).json({message:"success", company})
})


const deleteCompany = catchError(async (req,res,next)=>{

    let company = await Company.findByIdAndDelete(req.params.id)
    if(!company) return next(new AppError("company not found",404)) 
    res.status(200).json({message:"success"})
})

const getCompanyInfo = catchError(async (req,res,next)=>{

    let company = await Company.findById(req.params.id)
    company.password = undefined;
    if(!company) return next(new AppError("company not found",404))


    let jobs = await Job.find({ company: req.params.id });
    company.jobs = jobs;
    res.status(200).json({message:"success", company})
})


const searchWithCompanyName = catchError(async (req,res,next)=>{

    let company = await Company.findOne({companyName:req.body.companyName})
    if(!company) return next(new AppError("company not found",404)) 
    res.status(200).json({message:"success", company})
})


const getApplicationsForJob = catchError(async (req, res, next) => {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
        .populate({
            path: 'userId',
            select: '-password -__v' 
        });

    res.status(200).json({ message: "success", applications });
});

export {
    addCompany,
    updateCompany,
    deleteCompany,
    getCompanyInfo,
    searchWithCompanyName,
    getApplicationsForJob
}