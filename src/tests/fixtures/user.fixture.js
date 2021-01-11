import faker from 'faker';
import id from 'mongoose';
import BcryptService from '../../services/bcrypt.service';
import TokenService from '../../services/token.service';
import UserService from '../../services/user.service';

const objectId = id.Types.ObjectId();

export const userSignupInfo = {
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
};

export const userEmailExists = {
	fullName: faker.name.findName(),
	email: userSignupInfo.email,
	password: faker.internet.password(),
};

export const email = {
	email: faker.internet.email(),
};

const password = faker.internet.password();
const newUser = {
	_id: objectId,
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: BcryptService.hashPassword(password),
	createdAt: new Date(),
};

export const userEmailLogin = {
	email: newUser.email,
};

export const emailToken = TokenService.generateToken(userEmailLogin);

export const userPasswordLogin = {
	password,
};

export const loginToken = TokenService.generateToken({
	_id: newUser._id,
	fullName: newUser.fullName,
	email: newUser.email,
	createdAt: newUser.createdAt,
});

export const expiredToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1hY2suU21pdGhhbTczQGdtYWlsLmNvbSIsImlhdCI6MTYwODkwMzU0NCwiZXhwIjoxNjA4OTAzNjA0fQ.ayMIvVbMdolehwU6pyCd7zz8ri1l14AKjeKkQuh3t60';

export const selfIdString = newUser._id;

export const wrongPassword = {
	password: faker.internet.password(),
};

const userToChatWith = {
	_id: '5fe5bf733838897bd545ae2c',
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: BcryptService.hashPassword(password),
	createdAt: new Date(),
};
export const userToChatId = userToChatWith._id;

export const createUser = async () => {
	await UserService.createUser(newUser);
	await UserService.createUser(userToChatWith);
};
