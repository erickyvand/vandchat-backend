import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

class UserController {
	static async findAllUsers(req, res) {
		const users = await UserService.findUsersExceptAuthUser({
			_id: { $ne: req.userData._id },
		});
		const userData = users.map(user => {
			const data = { ...user._doc };
			delete data.password;
			return data;
		});
		ResponseService.setSuccess(200, 'All Users', userData);
		return ResponseService.send(res);
	}

	static async findOnlineUsers(req, res) {
		const onlineUsers = await UserService.findUsersExceptAuthUser({
			_id: { $ne: req.userData._id },
			socket: { $ne: '' },
		});
		const userData = onlineUsers.map(user => {
			const data = { ...user._doc };
			delete data.password;
			return data;
		});
		ResponseService.setSuccess(200, 'All online users', userData);
		return ResponseService.send(res);
	}

	static async searchUser(req, res) {
		const results = await UserService.searchUserByName({
			fullName: new RegExp(req.query.q, 'i'),
			_id: { $ne: req.userData._id },
		});
		ResponseService.setSuccess(200, 'Results found', results);
		return ResponseService.send(res);
	}
}

export default UserController;
