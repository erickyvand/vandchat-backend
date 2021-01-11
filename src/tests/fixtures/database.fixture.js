import User from '../../models/user';
import Chat from '../../models/chat';

export const cleanAllTables = async () => {
	await User.deleteMany({});
	await Chat.deleteMany({});
};
