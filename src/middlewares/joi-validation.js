const Joi = require("joi");

function validationMiddleware(schema) {
  return (req, res, next) => {
    const { error } = Joi.object()
      .keys(schema)
      .validate({
        ...req.body,
      });
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      res.status(422).json({ status:false, message });
    }
  };
}

module.exports = validationMiddleware;