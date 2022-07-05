import Joi from 'joi';

export const ProductSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),
    author: Joi.string()
        .min(10)
        .required(),
    ISBN: Joi.string()
        .alphanum()
        .min(13)
        .required(),
    isAvailable: Joi.boolean().required(),
});
