import Joi from 'joi';

const addCompanyVal = Joi.object({
    companyName: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(3).max(1000).required(),
    industry: Joi.string().min(2).max(50).required(),
    address: Joi.string().min(2).max(100).required(),
    numberOfEmployees: Joi.number().integer().min(5).max(25).required(),
    companyEmail: Joi.string().email().required(),
});


const updateCompanyVal = Joi.object({
    companyName: Joi.string().min(2).max(30),
    description: Joi.string().min(3).max(1000),
    industry: Joi.string().min(2).max(50),
    address: Joi.string().min(2).max(100),
    numberOfEmployees: Joi.number().integer().min(5).max(25),
    companyEmail: Joi.string().email(),
    id:Joi.string().length(24).hex().required(),
}).or('companyName', 'description', 'industry', 'address', 'numberOfEmployees', 'companyEmail');


const deleteCompanyVal = Joi.object({
    id:Joi.string().length(24).hex().required(),
});


const getCompanyInfoVal = Joi.object({
    id:Joi.string().length(24).hex().required(),
});


const searchWithCompanyNameVal = Joi.object({
    companyName: Joi.string().min(2).max(30).required(),
});


const getApplicationsForJobVal = Joi.object({
    companyId:Joi.string().length(24).hex().required(),
    jobId:Joi.string().length(24).hex().required(),
});

export { addCompanyVal,
    updateCompanyVal,
    deleteCompanyVal,
    getCompanyInfoVal,
    searchWithCompanyNameVal,
    getApplicationsForJobVal
 };