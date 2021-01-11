import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import socket from 'socket.io';
import routes from './routes';
import ResponseService from './services/response.service';
import ChatService from './services/chat.service';
import UserService from './services/user.service';
import Chat from './models/chat';

config();

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('Database connected'));

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);
app.get('/', (req, res) => {
	ResponseService.setError(200, 'Welcome to React chat API');
	return ResponseService.send(res);
});
app.use('/', (req, res) => {
	ResponseService.setError(404, 'You have provided a wrong route');
	return ResponseService.send(res);
});

const port = process.env.PORT || 4500;

const server = app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

const io = socket(server, {
	cors: {
		origin: process.env.FRONTEND_URL,
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	},
});

io.use((socket, next) => {
	const id = socket.handshake.query.id;
	socket.userId = id;
	next();
});

let users = [];
io.on('connection', async socket => {
	// console.log('User connected:' + socket.id);

	const messages = await Chat.find({ message: { $ne: '' } });

	io.emit('display_messages', messages);

	socket.on('user_connected', async ({ id, name }) => {
		users[id] = socket.id;

		await UserService.updateUserByProperty({ _id: id }, { socket: users[id] });
		const user = await UserService.findUserByProperty({ _id: socket.userId });

		let userData;
		if (user) {
			userData = { ...user._doc };
			delete userData.password;
		}

		io.emit('connected_users', userData);
	});

	socket.on('send_message', async data => {
		const socketId = users[data.userId];

		const message = await ChatService.createChatMessage({
			receiverId: data.userId,
			message: data.message,
			createdAt: new Date(),
			user: socket.userId,
		});

		const messages = await Chat.find({ message: { $ne: '' } });

		io.sockets.emit('display_messages', messages);
		io.to(socketId).emit('notification', message);
	});

	socket.on('typing', data => {
		const socketId = users[data.userId];
		socket.broadcast.to(socketId).emit('typing', data);
	});

	socket.on('disconnect', async () => {
		await UserService.updateUserByProperty(
			{ socket: socket.id },
			{ socket: '', updatedAt: new Date() }
		);
		const user = await UserService.findUserByProperty({ _id: socket.userId });
		io.sockets.emit('connected_users', user);
		delete users[socket.userId];
		socket.disconnect();
		console.log('disconnected:' + socket.id);
	});
});

export default app;
