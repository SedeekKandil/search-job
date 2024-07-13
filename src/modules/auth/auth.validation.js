import Joi from "joi"


const signupVal = Joi.object({
    firstName:Joi.string().min(3).max(30).required(),
    lastName:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    recoveryEmail:Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),
    repassword: Joi.valid(Joi.ref('password')).required(),
    mobileNumber:Joi.string().pattern(/^[a-zA-Z0-9\-().\s]{10,15}$/).required(),
    role: Joi.string().valid('user', 'company_HR'),
    dateOfBirth:Joi.string().pattern(/(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}/).message('Invalid date format. Use MM/DD/YYYY or M/D/YYYY format')
})

const signinVal = Joi.object({
    email:Joi.string().email(),
    mobileNumber:Joi.string().pattern(/^[a-zA-Z0-9\-().\s]{10,15}$/),
    password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),
}).or('email', 'mobileNumber').required();

export {
    signupVal,
    signinVal
}