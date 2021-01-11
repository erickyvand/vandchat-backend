import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { createChatMessage } from '../fixtures/chat.fixture';
import { cleanAllTables } from '../fixtures/database.fixture';
import {
	createUser,
	email,
	emailToken,
	userEmailLogin,
	userPasswordLogin,
	wrongPassword,
} from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST login by providing email', () => {
	before(async () => {
		await cleanAllTables();
		await createUser();
		await createChatMessage();
	});
	it('Should provide an email to proceed login', done => {
		chai
			.request(app)
			.post('/api/auth/email')
			.send(userEmailLogin)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(200);
				res.body.should.have.property('message');
				res.body.message.should.equal('Success, proceed to login');
				res.body.should.have.property('data');
				res.body.data.should.have.property('token');
			});
		done();
	});

	it('Should validate the provided email', done => {
		chai
			.request(app)
			.post('/api/auth/email')
			.send()
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(400);
				res.body.should.have.property('message');
			});
		done();
	});

	it('Should check if email exists before proceeding', done => {
		chai
			.request(app)
			.post('/api/auth/email')
			.send(email)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(401);
				res.body.should.have.property('message');
			});
		done();
	});
});

describe('/POST password to login', () => {
	it('Should login and get token by providing a correct password', done => {
		chai
			.request(app)
			.post('/api/auth/password')
			.set('Authorization', `Bearer ${emailToken}`)
			.send(userPasswordLogin)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(200);
				res.body.should.have.property('message');
				res.body.message.should.equal('You have logged in');
				res.body.should.have.property('data');
				res.body.data.should.have.property('token');
				res.body.data.should.have.property('user');
			});
		done();
	});

	it('Should validate password input field', done => {
		chai
			.request(app)
			.post('/api/auth/password')
			.set('Authorization', `Bearer ${emailToken}`)
			.send()
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(400);
				res.body.should.have.property('message');
			});
		done();
	});

	it('Should check invalid password', done => {
		chai
			.request(app)
			.post('/api/auth/password')
			.set('Authorization', `Bearer ${emailToken}`)
			.send(wrongPassword)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(401);
				res.body.should.have.property('message');
				res.body.message.should.equal('Invalid password');
			});
		done();
	});
});
