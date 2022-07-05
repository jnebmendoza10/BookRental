import Joi from 'joi';
import { Role } from '../Role';

export const UserSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(15)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(8)
        .required(),
    role: Joi.string()
        .valid(Role.Admin, Role.Renter)
        .required(),
});
