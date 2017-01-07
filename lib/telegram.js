const request       = require('request');
const logger        = require('./../logger.js');
const config        = require('./../config/');

module.exports = {
	send: (options, cb) => {
		let payload = {
			chat_id: config('TELEGRAM_CHANNEL_ID'),
			text: options['text']
		};

		logger.debug('Telegram payload', JSON.stringify(payload));

		let url = config('TELEGRAM_ENDPOINT') + config('TELEGRAM_TOKEN');
		if (options['photo']) {
			url += '/sendPhoto';
			payload['photo'] = options['photo'];
		}
		else {
			url += '/sendMessage';
		}

		request({ url: url, json: payload, method: 'POST' }, (err, response, body) => {
			if (err) {
				cb(err);
				return;
			}

			if (response['statusCode'] != 200 || !body['ok']) {
				cb(new Error(body));
				return;
			}

			cb();
			return;
		});
	}
};