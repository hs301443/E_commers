import Joi from "joi";

export const createbrandshema=Joi.object({

    name:Joi.string().min(2).max(30).required()
});

export const updatebrandshema=Joi.object({

    name:Joi.string().min(2).max(30).required(),
    id:Joi.string().hex().length(24).required()
});

export const deletebrandshema=Joi.object({

    id:Joi.string().hex().length(24).required()

});