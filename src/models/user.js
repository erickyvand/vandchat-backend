import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	socket: {
		type: String,
		default: '',
	},
	createdAt: {
		type: Date,
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
});

const User = mongoose.model('User', userSchema);

export default User;
