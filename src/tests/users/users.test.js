import chai from 'chai';
import chaiHttp from 'chai-http';
import chatHttp from 'chai-http';
import app from '../../app';
import { loginToken } from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/GET retrieve all users expect authenticate user', () => {
	it('Should retrieve users', done => {
		chai
			.request(app)
			.get('/api/users')
			.set('Authorization', `Bearer ${loginToken}`)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(200);
				res.body.should.have.property('message');
				res.body.message.should.equal('All Users');
				res.body.should.have.property('data');
				res.body.data.should.be.an('array');
				done();
			});
	});
});

describe('/GET search a user by name', () => {
	it('Should search a user', done => {
		chai
			.request(app)
			.get('/api/users/search-user?q=vvv')
			.set('Authorization', `Bearer ${loginToken}`)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(200);
				res.body.should.have.property('message');
				res.body.message.should.equal('Results found');
				res.body.should.have.property('data');
				res.body.data.should.be.an('array');
				done();
			});
	});
});
