const should      = require('should');
const twitter     = require('./../lib/twitter.js');

describe('Twitter test', () => {

	it('Should get object with text field', (done) => {
		let sample = {
			id: 'id',
			text: '#infobus'
		};

		twitter.onData(sample, (err, result) => {
			if (err) throw err;

			result.should.have.property('text').which.is.not.null();

			done();
		});
	});

	it('Should get object without text field', (done) => {
		let sample = {
			id: 'id',
			text: 'text'
		};

		twitter.onData(sample, (err, result) => {
			if (err) throw err;

			result.should.have.property('text').which.is.null();

			done();
		});
	});
});