import BcryptService from '../services/bcrypt.service';
import ResponseService from '../services/response.service';
import TokenService from '../services/token.service';
import UserService from '../services/user.service';

/**
 * Auth class controller
 */
class AuthController {
	/**
	 * * @param  {object} req
	 * * @param  {object} res
	 * * @returns {object} use UserService to create a user in database
	 */
	static async signup(req, res) {
		const user = await UserService.createUser({
			fullName: req.body.fullName,
			email: req.body.email,
			password: BcryptService.hashPassword(req.body.password),
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const userData = { ...user._doc };
		delete userData.password;
		ResponseService.setSuccess(201, 'User successfully created', {
			token: TokenService.generateToken(userData),
			user: userData,
		});
		return ResponseService.send(res);
	}

	/**
	 * * @param  {object} req
	 * * @param  {object} res
	 * * @returns {object} Email for login
	 */
	static findEmailToLogin(req, res) {
		ResponseService.setSuccess(200, 'Success, proceed to login', {
			token: TokenService.generateToken({ email: req.body.email }),
		});
		return ResponseService.send(res);
	}

	/**
	 * * @param  {object} req
	 * * @param  {object} res
	 * * @returns {object} Password for login
	 */
	static async comparePasswordToLogin(req, res) {
		ResponseService.setSuccess(200, 'You have logged in', {
			token: TokenService.generateToken(req.userData),
			user: req.userData,
		});
		return ResponseService.send(res);
	}
}

export default AuthController;
