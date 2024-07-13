import { Company } from "../../../database/models/company.model.js";
import { Job } from "../../../database/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";


const addJob = catchError(async (req, res, next) => {
    
    let jobData = { ...req.body, addedBy: req.companyId };
    let job = await Job.create(jobData);
    res.status(201).json({ message: "success", job });
});


const updateJob = catchError(async (req,res,next)=>{

    let job = await Job.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!job) return next(new AppError("job not found",404)) 
    res.status(200).json({message:"success", job})
})


const deleteJob = catchError(async (req,res,next)=>{

    let job = await Job.findByIdAndDelete(req.params.id)
    if(!job) return next(new AppError("job not found",404)) 
    res.status(200).json({message:"success"})
})


const getAllJobsWithCompanyInfo = catchError(async (req, res, next) => {
    const jobs = await Job.find().populate('addedBy', '-createdAt -updatedAt');
    
    res.status(200).json({ message: "success", jobs });
})


const getAllJobsByCompanyName = catchError(async (req, res, next) => {
    let company = await Company.findOne({companyName:req.query.companyName})
    if (!company) {
        return next(new AppError("Company not found", 404));
    }

    let jobs = await Job.find({ addedBy: company._id });
    res.status(200).json({ message: "success", jobs });
})

const getFilteredJobs = catchError(async (req, res) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;

    let filter = {}

    if (workingTime) {
        filter.workingTime = workingTime
    }
    if (jobLocation) {
        filter.jobLocation = jobLocation
    }
    if (seniorityLevel) {
        filter.seniorityLevel = seniorityLevel
    }
    if (jobTitle) {
        filter.jobTitle = { $regex: jobTitle, $options: 'i' }
    }
    if (technicalSkills) {
        filter.technicalSkills = { $in: technicalSkills.split(',') }
    }

    let jobs = await Job.find(filter).populate('addedBy', 'companyName')
    res.status(200).json({ message: "success", jobs })
});




export{
    addJob,
    updateJob,
    deleteJob,
    getAllJobsWithCompanyInfo,
    getAllJobsByCompanyName,
    getFilteredJobs
}