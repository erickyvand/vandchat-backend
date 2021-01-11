import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { chatId } from '../fixtures/chat.fixture';
import { loginToken } from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/GET retrieve chat message', () => {
	it('Should send an chat message', done => {
		chai
			.request(app)
			.get(`/api/chat/${chatId}`)
			.set('Authorization', `Bearer ${loginToken}`)
      .end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(200);
				res.body.should.have.property('message');
				res.body.message.should.equal('The retrieved chat');
				res.body.should.have.property('data');
				res.body.data.should.have.property('_id');
				res.body.data.should.have.property('receiverId');
			});
		done();
	});
  
  it('Should check if chat ID is valid', done => {
		chai
			.request(app)
			.get('/api/chat/erw2')
			.set('Authorization', `Bearer ${loginToken}`)
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
  
  it('Should check if chat ID exists', done => {
		chai
			.request(app)
			.get('/api/chat/erw2fe4jsuf4')
			.set('Authorization', `Bearer ${loginToken}`)
      .end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(404);
				res.body.should.have.property('message');
			});
		done();
	});
});
