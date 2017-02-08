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
});