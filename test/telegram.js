const should      = require('should');
const telegram    = require('./../lib/telegram.js');

describe('Telegram test', () => {

	it('Should send text', (done) => {
		let sample = {
			text: 'text'
		};

		telegram.send(sample, (err, result) => {
			if (err) throw err;

			done();
		});
	});

	it('Should send photo', (done) => {
		let sample = {
			text: 'text',
			photo: 'http://www.dike.lib.ia.us/images/sample-1.jpg'
		};

		telegram.send(sample, (err, result) => {
			if (err) throw err;

			done();
		});
	});

	it('Should get error (invalid photo)', (done) => {
		let sample = {
			text: 'text',
			photo: 'fake'
		};

		telegram.send(sample, (err, result) => {
			if (err) {
				done();
				return;
			}

			throw new Error('no errors');
		});
	});

	
});