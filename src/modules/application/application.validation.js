import Joi from 'joi';

const applicationVal = Joi.object({
    jobId:Joi.string().length(24).hex().required(),
    userTechSkills: Joi.array().items(Joi.string()).required(),
    userSoftSkills: Joi.array().items(Joi.string()).required(),

  });


export {
    applicationVal
}