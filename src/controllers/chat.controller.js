import ChatService from '../services/chat.service';
import ResponseService from '../services/response.service';

/**
 * Chat controller class
 */
class ChatController {
	/**
	 * @param  {object} req
	 * @param  {object} res
	 * @returns {object} making chat
	 */
	static async makeChatMessages(req, res) {
		const chat = await ChatService.createChatMessage({
			receiverId: req.body.receiverId,
			message: req.body.message,
			createdAt: new Date(),
			user: req.userData._id,
		});
		ResponseService.setSuccess(201, 'Chat message has been created', chat);
		return ResponseService.send(res);
	}

	/**
	 * @param  {object} req
	 * @param  {object} res
	 * @returns {object} get single chat
	 */
	static async getSingleChatMessages(req, res) {
		ResponseService.setSuccess(200, 'The retrieved chat', req.chat);
		return ResponseService.send(res);
	}

	static async getReceivedChatMessages(req, res) {
		const receivedMessages = await ChatService.findReceivedChatMessagesByProperty(
			{
				receiverId: req.userData._id,
			}
		).sort({ createdAt: -1 });
		ResponseService.setSuccess(200, 'All received chat messages', {
			messages: receivedMessages,
		});
		return ResponseService.send(res);
	}

	static async getThreadChatMessages(req, res) {
		const messages = await ChatService.findAllChatMessagesByProperty({
			$or: [{ receiverId: req.userData._id }, { user: req.userData._id }],
		});

		const receiver = messages.map(message => {
			return {
				id: message.receiverId.id,
				fullName: message.receiverId.fullName,
				socket: message.receiverId.socket,
				updatedAt: message.receiverId.updatedAt,
			};
		});
		const sender = messages.map(message => {
			return {
				id: message.user.id,
				fullName: message.user.fullName,
				socket: message.user.socket,
				updatedAt: message.user.updatedAt,
			};
		});
		const threadMessages = sender.concat(receiver);

		ResponseService.setSuccess(200, 'All thread chat messages', threadMessages);
		return ResponseService.send(res);
	}

	static async deleteEmptyMessage(req, res) {
		await ChatService.deleteMessageByProperty({ message: '' });
		ResponseService.setSuccess(200, 'Chat has been deleted');
		return ResponseService.send(res);
	}
}

export default ChatController;
