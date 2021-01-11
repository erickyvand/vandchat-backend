import ChatService from '../services/chat.service';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

export const checkSelfUserAndIfExists = async (req, res, next) => {
	let user;
	try {
		user = await UserService.findUserByProperty({
			_id: req.body.receiverId,
		});
	} catch (err) {
		ResponseService.setError(
			500,
			'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
		);
		return ResponseService.send(res);
	}

	if (!user) {
		ResponseService.setError(404, 'User not found');
		return ResponseService.send(res);
	}

	if (user._id == req.userData._id) {
		ResponseService.setError(401, 'Can not send message to yourself');
		return ResponseService.send(res);
	}
	next();
};

export const checkChatParam = async (req, res, next) => {
	let chat;
	try {
		chat = await ChatService.findChatByProperty({
			_id: req.params.chatId,
		});
	} catch (err) {
		ResponseService.setError(
			500,
			'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
		);
		return ResponseService.send(res);
	}

	if (!chat) {
		ResponseService.setError(404, 'Not chat has been found');
		return ResponseService.send(res);
	}
	req.chat = chat;
	next();
};
