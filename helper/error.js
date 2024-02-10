exports.errorCatch = (req, res, status = 500, message = 'Server failed to comprehend API request') => {
	return res.status(status).json({
		message: message,
	});
};