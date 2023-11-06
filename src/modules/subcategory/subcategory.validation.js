

import Joi from "joi";

export const createsubcategoryshema=Joi.object({
    name:Joi.string().min(2).max(30).required(),
    category:Joi.string().hex().length(24).required(),
})
export const updatesubcategoryshema=Joi.object({
    name:Joi.string().hex().length(24).required(),
    category:Joi.string().hex().length(24).required(),
    id:Joi.string().hex().length(24).required(),
})
export const deletesubcategoryshema=Joi.object({
     id:Joi.string().hex().length(24).required(),
})