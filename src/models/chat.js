import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
	receiverId: {
		type: String,
		required: true,
		ref: 'User',
	},
	message: {
		type: String,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
