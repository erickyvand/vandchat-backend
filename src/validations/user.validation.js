import Joi from 'joi';
import ResponseService from '../services/response.service';
import TokenService from '../services/token.service';

/**
 * * @param  {object} req
 * * @param  {object} res
 * * @param  {object} next
 * * @returns {object} validate user input fields
 */
export const validateSignupBody = (req, res, next) => {
	const schema = Joi.object({
		fullName: Joi.string().trim().min(2).required().messages({
			'any.required': 'Full Name is required.',
			'string.empty': 'Full Name is not allowed to be empty',
			'string.min': 'Full Name length must be at least 2 characters long',
		}),
		email: Joi.string().email().required().messages({
			'any.required': 'Email is required',
			'string.empty': 'Email is not allowed to empty',
			'string.email': 'Email must be a valid email',
		}),
		password: Joi.string().trim().min(6).required().messages({
			'any.required': 'Password is required',
			'string.empty': 'Password is not allowed to be empty',
			'string.min': 'Password length must be at least 6 characters long',
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

/**
 * * @param  {object} req
 * * @param  {object} res
 * * @param  {object} next
 * * @returns {object} validate email
 */
export const validateEmailBody = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			'string.empty': 'Email must not be empty',
			'string.email': 'Email must be a valid email',
			'any.required': 'Email is required',
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

/**
 * * @param  {object} req
 * * @param  {object} res
 * * @param  {object} next
 * * @returns {object} validate password
 */
export const validatePasswordBody = (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string().trim().min(6).required().messages({
			'any.required': 'Password is required',
			'string.empty': 'Password is not allowed to be empty',
			'string.min': 'Password length must be at least 6 characters long',
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
