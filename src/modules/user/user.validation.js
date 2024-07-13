
import Joi from "joi"


const updateUserVal = Joi.object({
    firstName:Joi.string().min(3).max(30),
    lastName:Joi.string().min(3).max(30),
    email:Joi.string().email(),
    recoveryEmail:Joi.string().email(),
    mobileNumber:Joi.string().pattern(/^[a-zA-Z0-9\-().\s]{10,15}$/),
    dateOfBirth:Joi.string().pattern(/(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}/).message('Invalid date format. Use MM/DD/YYYY or M/D/YYYY format'),
    id:Joi.string().length(24).hex().required()
})

const deleteUserVal = Joi.object({
    id:Joi.string().length(24).hex().required()
})

const getUserInfoVal = Joi.object({
    id:Joi.string().length(24).hex().required()
})


const updatePassVal = Joi.object({
    id:Joi.string().length(24).hex().required(),
    password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required()
})

const forgetPassVal = Joi.object({
    email:Joi.string().email().required(),
})

const verifyOtpVal = Joi.object({
    email:Joi.string().email().required(),
    otp:Joi.string().length(6).required()
})

const getAllUsersWithRecoveryEmailVal = Joi.object({
    recoveryEmail:Joi.string().email().required()
})

export {
    updateUserVal,
    deleteUserVal,
    getUserInfoVal,
    updatePassVal,
    forgetPassVal,
    verifyOtpVal,
    getAllUsersWithRecoveryEmailVal
}