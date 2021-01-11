import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
	chatBody,
	invalidIdString,
	noUserFound,
	selfChatBody,
} from '../fixtures/chat.fixture';
import { expiredToken, loginToken } from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST send chat message', () => {
	it('Should check if authorization has been set', done => {
		chai
			.request(app)
			.post('/api/chat')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(403);
				res.body.should.have.property('message');
				res.body.message.should.equal(
					'You can not proceed without setting authorization token'
				);
			});
		done();
	});

	it('Should check if token is valid', done => {
		chai
			.request(app)
			.post('/api/chat')
			.set('Authorization', 'Bearer')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(401);
				res.body.should.have.property('message');
				res.body.message.should.equal('Unauthorized, invalid token');
			});
		done();
	});

	it('Should check if token has not been expired', done => {
		chai
			.request(app)
			.post('/api/chat')
			.set('Authorization', expiredToken)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(401);
				res.body.should.have.property('message');
				res.body.message.should.equal(
					'Unauthorized, Token has expired signin again to get new token'
				);
			});
		done();
	});

	it('Should send an chat message', done => {
		chai
			.request(app)
			.post('/api/chat')
			.set('Authorization', `Bearer ${loginToken}`)
			.send(chatBody)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(201);
				res.body.should.have.property('message');
				res.body.message.should.equal('Chat message has been created');
				res.body.should.have.property('data');
				res.body.data.should.have.property('_id');
				res.body.data.should.have.property('receiverId');
				res.body.data.should.have.property('message');
			});
		done();
	});

	it('Should validate input fields', done => {
		chai
			.request(app)
			.post('/api/chat')
			.set('Authorization', `Bearer ${loginToken}`)
			.send()
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(400);
				res.body.should.have.property('message');
			});
		done();
	});

	it('Should check if ID string is valid', done => {
		chai
			.request(app)
			.post('/api/chat')
			.set('Authorization', `Bearer ${loginToken}`)
			.send(invalidIdString)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(500);
				res.body.should.have.property('message');
				res.body.message.should.equal(
					'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
				);
			});
		done();
	});

	it('Should check if user exists', done => {
		chai
			.request(app)
			.post('/api/chat')
			.set('Authorization', `Bearer ${loginToken}`)
			.send(noUserFound)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(404);
				res.body.should.have.property('message');
				res.body.message.should.equal('User not found');
			});
		done();
	});

	it('Should not chat to himself', done => {
		chai
			.request(app)
			.post('/api/chat')
			.set('Authorization', `Bearer ${loginToken}`)
			.send(selfChatBody)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(401);
				res.body.should.have.property('message');
				res.body.message.should.equal('Can not send message to yourself');
			});
		done();
	});
});
