import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('Test App', () => {
	it('Should give a welcome message for root route', done => {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(200);
				res.body.should.have.property('message');
				res.body.message.should.equal('Welcome to React chat API');
			});
		done();
	});

	it('Should check if route exists', done => {
		chai
			.request(app)
			.post('/')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.status.should.equal(404);
				res.body.should.have.property('message');
				res.body.message.should.equal('You have provided a wrong route');
			});
		done();
	});
});
