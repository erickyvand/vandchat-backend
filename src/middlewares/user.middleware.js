import BcryptService from '../services/bcrypt.service';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

/**
 * * @param  {object} req
 * * @param  {object} res
 * * @param  {object} next
 * * @returns {object} check if a user email exists in a database
 */
export const checkEmailDuplication = async (req, res, next) => {
	const user = await UserService.findUserByProperty({ email: req.body.email });

	if (user) {
		ResponseService.setError(409, 'Email already exits');
		return ResponseService.send(res);
	}
	next();
};

/**
 * * @param  {object} req
 * * @param  {object} res
 * * @param  {object} next
 * * @returns {object} check if a user email does not exists in a database
 */
export const checkIfEmailExists = async (req, res, next) => {
	const user = await UserService.findUserByProperty({ email: req.body.email });

	if (!user) {
		ResponseService.setError(401, 'Invalid credentials');
		return ResponseService.send(res);
	}
	next();
};

/**
 * * @param  {object} req
 * * @param  {object} res
 * * @param  {object} next
 * * @returns {object} check if passwords match
 */
export const checkIfPasswordsMatch = async (req, res, next) => {
	const user = await UserService.findUserByProperty({
		email: req.userData.email,
	});

	const userData = { ...user._doc };
	delete userData.password;

	if (!BcryptService.comparePassword(req.body.password, user.password)) {
		ResponseService.setError(401, 'Invalid password');
		return ResponseService.send(res);
	}
	req.userData = userData;
	next();
};
