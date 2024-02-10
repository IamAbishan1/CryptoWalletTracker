const { errorCatch } = require("../../../utils/error");
const { validationResult } = require('express-validator');

/**
 * Middleware function to validate incoming request data using express-validator.
 * @param {import('express').Request} req The Express request object.
 * @param {import('express').Response} res The Express response object.
 * @param {import('express').NextFunction} next The next middleware function in the request-response cycle.
 * @returns {void}
 */
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