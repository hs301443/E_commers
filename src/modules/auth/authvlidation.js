import Joi from "joi";

export const signinvalidation={
    body:Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required(),
    })
} 