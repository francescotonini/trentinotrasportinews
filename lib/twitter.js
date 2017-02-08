const logger        = require('./../logger.js');

module.exports = {
	onData: (event, cb) => {
		if (!event) {
			cb(new Error('Response is empty'));
			return;
		}

		logger.info(`Received tweet #${event['id']}`);
		let options = {
			text: event['text'].match(/#info/) ? event['text'] : null
		};

		cb(null, options);
	}
};