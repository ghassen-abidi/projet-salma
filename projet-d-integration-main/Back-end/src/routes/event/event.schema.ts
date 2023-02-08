import Joi from "joi";
export const create = Joi.object({
    title : Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required().min(6)
  
});