import User from '../models/user';

/**
 * User service class
 */
class UserService {
	/**
	 * * @param  {object} data
	 * * @returns {object} create a user
	 */
	static createUser(data) {
		return User.create(data);
	}

	/**
	 * * @param  {object} property
	 * * @returns {object} find a user by any property
	 */
	static findUserByProperty(property) {
		return User.findOne(property);
	}

	static findUsersExceptAuthUser(property) {
		return User.find(property).sort({ fullName: 1 });
	}

	static searchUserByName(property) {
		return User.find(property);
	}

	static updateUserByProperty(property, attribute) {
		return User.updateOne(property, attribute);
	}
}

export default UserService;
