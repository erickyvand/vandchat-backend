import Joi from 'joi';
import ResponseService from '../services/response.service';

export const validateChatBody = (req, res, next) => {
	const schema = Joi.object({
		receiverId: Joi.string().required().messages({
			'any.required': 'receiverId is required',
			'string.empty': 'Receiver must not be empty',
		}),
		message: Joi.string().allow('').required().messages({
			'any.required': 'message is required',
			'string.empty': 'Message must not be empty',
		}),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};
