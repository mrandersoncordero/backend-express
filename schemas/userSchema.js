const Joi = require('joi');

const id = Joi.string().uuid(),
    name = Joi.string()
        .min(3)
        .max(15),
    gender = Joi.string()
        .min(5)
        .max(10),
    job = Joi.string().min(5).max(20);

const createUserSchema = Joi.object({
    first_name: name.required(),
    last_name: name.required(),
    gender: gender.required(),
    job: job.required(),
});

const updateUserSchema = Joi.object({
    first_name: name,
    last_name: name,
    gender: gender,
    job: job,
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }