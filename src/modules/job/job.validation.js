import Joi from 'joi';


const addJobVal = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime: Joi.string().valid('part-time', 'full-time', 'internship').required(),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription: Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string()).required(),
    softSkills: Joi.array().items(Joi.string()).required(),
})


const updateJobVal = Joi.object({
    jobTitle: Joi.string(),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().valid('part-time', 'full-time', 'internship'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: Joi.string(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
    id:Joi.string().length(24).hex().required()
}).or('jobTitle', 'jobLocation', 'workingTime', 'seniorityLevel', 'jobDescription', 'technicalSkills', 'softSkills');

const deleteJobVal = Joi.object({
    id:Joi.string().length(24).hex().required()
})


const getAllJobsByCompanyNameVal = Joi.object({
    companyName: Joi.string().min(3).max(30).required(),
})


const getFilteredJobsVal = Joi.object({
    jobTitle: Joi.string(),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().valid('part-time', 'full-time', 'internship'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    technicalSkills: Joi.array().items(Joi.string())
}).or('jobTitle', 'jobLocation', 'workingTime', 'seniorityLevel', 'technicalSkills');


export {
    addJobVal,
    updateJobVal,
    deleteJobVal,
    getAllJobsByCompanyNameVal,
    getFilteredJobsVal
}