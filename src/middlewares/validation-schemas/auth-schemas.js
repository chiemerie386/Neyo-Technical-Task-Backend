const Joi = require("joi");

const email = Joi.string().trim().email({ minDomainSegments: 2 });

exports.registerSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().trim().required(),
    email: email.required(),
    password: Joi.string().trim().required(),
};

exports.loginSchema = {
    email: email.required(),
    password: Joi.string().trim().required(),
};

