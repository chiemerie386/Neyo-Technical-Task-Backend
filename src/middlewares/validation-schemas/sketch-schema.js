const Joi = require("joi");

exports.createSketchSchema = {
    title: Joi.string().required(),
};

exports.updateSketchSchema = {
    body: Joi.string().required(),
};