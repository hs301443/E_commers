

import Joi from "joi";

export const createcategoryshema=Joi.object({
    name:Joi.string().min(2).max(30).required(),
    
})
export const updatecategoryshema=Joi.object({
    name:Joi.string().min(2).max(30).required(),
    id:Joi.string().hex().length(24).required(),
})
export const deletecategoryshema=Joi.object({
    
    id:Joi.string().hex().length(24).required(),
})
