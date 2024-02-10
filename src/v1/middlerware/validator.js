const { errorCatch } = require("../../helper/error");
const { validationResult } = require('express-validator');

exports.validator = (req, res, next) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      console.error(validationError.errors);
      return errorCatch(
        req,
        res,
        400,
        validationError.errors[0].nestedErrors
          ? validationError.errors[0].nestedErrors[0].msg
          : validationError.errors[0].msg
      );
    }
    next();
  };