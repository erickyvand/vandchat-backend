import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { userEmailExists, userSignupInfo } from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST Signup a user', () => {
	it('Should signup a user on a successful information', done => {
		chai
			.request(app)
			.post('/api/auth/signup')
			.send(userSignupInfo)
			.end((err, res) => {
				res.body.should.have.a.property('status');
				res.status.should.be.equal(201);
				res.body.should.have.a.property('message');
				res.body.message.should.equal('User successfully created');
				res.body.should.have.property('data');
				res.body.data.should.be.an('object');
				res.body.data.should.have.a.property('token');
				res.body.data.should.have.a.property('user');
				res.body.data.user.should.be.an('object');
				res.body.data.user.should.have.a.property('_id');
				res.body.data.user.should.have.a.property('fullName');
				res.body.data.user.should.have.a.property('email');
				res.body.data.user.should.have.a.property('createdAt');
				done();
			});
	});

	it('Should validate input fields', done => {
		chai
			.request(app)
			.post('/api/auth/signup')
			.send()
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.a.property('status');
				res.status.should.be.equal(400);
				res.body.should.have.a.property('message');
				done();
			});
	});

	it('Should check if email already exists', done => {
		chai
			.request(app)
			.post('/api/auth/signup')
			.send(userEmailExists)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.a.property('status');
				res.status.should.be.equal(409);
				res.body.should.have.a.property('message');
				res.body.message.should.equal('Email already exits');
				done();
			});
	});
});
