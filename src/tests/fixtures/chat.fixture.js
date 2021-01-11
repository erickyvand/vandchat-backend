import faker from 'faker';
import ChatService from '../../services/chat.service';
import { selfIdString, userToChatId } from './user.fixture';

export const chatBody = {
	receiverId: userToChatId,
	message: faker.lorem.words(),
};

export const invalidIdString = {
	receiverId: '5fe5',
	message: faker.lorem.words(),
};

export const noUserFound = {
	receiverId: '5fe5edb55fa6c89da4869f04',
	message: faker.lorem.words(),
};

export const selfChatBody = {
	receiverId: selfIdString,
	message: faker.lorem.words(),
};

const newChatMessage = {
	_id: '5fe5bf733838897bd545af83',
	receiverId: userToChatId,
	message: faker.lorem.words(),
	user: selfIdString,
};

export const chatId = newChatMessage._id;

export const createChatMessage = async () => {
	await ChatService.createChatMessage(newChatMessage);
};
