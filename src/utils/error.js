/**
 * Sends an error response with the specified status code and message.
 * @param {import('express').Request} req The Express request object.
 * @param {import('express').Response} res The Express response object.
 * @param {number} [status=500] The HTTP status code of the error response. Default is 500 (Internal Server Error).
 * @param {string} [message='Server failed to comprehend API request'] The error message to be sent in the response. Default is 'Server failed to comprehend API request'.
 * @returns {import('express').Response} The Express response object with the error message and status code set.
 */
exports.errorCatch = (req, res, status = 500, message = 'Server failed to comprehend API request') => {
	return res.status(status).json({
		message: message,
	});
};