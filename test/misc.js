const should      = require('should');
const app         = require('./../index.js');

describe('Misc test', () => {

	it('Should not crash', (done) => {
		setTimeout(() => {
			done();
		}, 5000);
	});
});