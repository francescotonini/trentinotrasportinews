const should      = require('should');
const twitter     = require('./../lib/twitter.js');

describe('Twitter test', () => {

	it('Should get object with photo field', (done) => {
		let sample = {
			id: 'id',
			text: 'text',
			entities: {
				media: [
					'url'
				]
			}
		};

		twitter.onData(sample, (err, result) => {
			if (err) throw err;

			result.should.have.property('text').which.is.not.null();
			result.should.have.property('photo').which.is.not.null();
			result.should.have.property('url').which.is.not.null();

			done();
		});
	});

	it('Should get object without photo field', (done) => {
		let sample = {
			id: 'id',
			text: 'text',
			entities: { }
		};

		twitter.onData(sample, (err, result) => {
			if (err) throw err;

			result.should.have.property('text').which.is.not.null();
			result.should.have.property('photo').which.is.null();
			result.should.have.property('url').which.is.not.null();

			done();
		});
	});
});