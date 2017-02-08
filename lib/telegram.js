const request       = require('request');
const config        = require('./../config/');

module.exports = {
	send: (options, cb) => {
		if (!options['text']) {
			// No text no party

			cb();
			return;
		}

		let payload = {
			chat_id: config('TELEGRAM_CHANNEL_ID'),
			text: options['text']
		};

		let url = config('TELEGRAM_ENDPOINT') + config('TELEGRAM_TOKEN') + '/sendMessage';
		request({ url: url, json: payload, method: 'POST' }, (err, response, body) => {
			/* istanbul ignore if  */
			if (err) {
				cb(err);
				return;
			}

			/* istanbul ignore if  */
			if (response['statusCode'] != 200 || !body['ok']) {
				cb(new Error(JSON.stringify(body)));
				return;
			}

			cb();
			return;
		});
	}
};