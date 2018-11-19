const request = require('supertest');
const app = require('../index');

describe('Stations Endpoint', () => {
	it('should return requests from bicing API', (done) => {
		request(app).get('/stations').expect('Content-Type', 'text/plain; charset=utf-8').expect(200, done);
	});
});
