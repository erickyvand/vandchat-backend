import bcrypt from 'bcrypt';

/**
 * Bcrypt service class
*/
class BcryptService {
	/**
	 * * @param  {string} password
	 * * @returns {string} generate a password
	 */
	static hashPassword(password) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}

	/**
	 * * @param  {string} plainPassword
	 * * @param  {string} hashPassword
	 * * @returns {boolean} compare passwords
	 */
	static comparePassword(plainPassword, hashPassword) {
		return bcrypt.compareSync(plainPassword, hashPassword);
	}
}

export default BcryptService;
