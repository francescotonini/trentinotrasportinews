const logger        = require('./../logger.js');
const config        = require('./../config/');

module.exports = {
	onData: (event, cb) => {
		if (!event) {
			cb(new Error('Response is empty'));
			return;
		}

		logger.info(`Received tweet #${event['id']}`);
		let options = {
			text: event['text'],
			photo: event['entities']['media'] ? event['entities']['media'][0] : null,
			url: `https://twitter.com/${config('ACCOUNT_TO_FOLLOW')}/status/${event['id']}`
		};

		cb(null, options);
	}
};