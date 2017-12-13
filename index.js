const Twitter  = require('twitter');
const request  = require('request');
const logger   = require('./logger.js');
const config   = require('./config/');

logger.info('Initializing...');

const client = new Twitter({
	consumer_key: config('TWITTER_CONSUMER_KEY'),
	consumer_secret: config('TWITTER_CONSUMER_SECRET'),
	access_token_key: config('TWITTER_ACCESS_TOKEN_KEY'),
	access_token_secret: config('TWITTER_ACCESS_TOKEN_SECRET')
});

client.stream('statuses/filter', { follow: config('ACCOUNT_TO_FOLLOW') }, (stream) => {
	logger.info('Stream ready');

	// Fires when an event is caught
	stream.on('data', (event) => {
		// Checks if event is null
		if (!event) {
			logger.error('Event is null');
			return;
		}

		logger.info(`Received tweet #${event['id']}`);

		// Checks if event's text matches the regex below. If not, skip this
		// event
		if (!event['text'].match(/#info|#INFO/)) {
			logger.info(`Ignoring tweet #${event['id']}. Text doesn't match expression`);
			return;
		}

		// Sends the event to Telegram
		request({
			url: config('TELEGRAM_ENDPOINT') + config('TELEGRAM_TOKEN') + '/sendMessage',
			json: {
				chat_id: config('TELEGRAM_CHANNEL_ID'),
				text: event['text']
			},
			method: 'POST'
		}, (err, response, body) => {
			if (err) {
				logger.error(`Unable to send message to Telegram, ${err['message']}`);
				return;
			}

			if (response['statusCode'] != 200 || !body['ok']) {
				logger.error(`Unable to send message to Telegram, ${body}`);
				return;
			}

			// Text sent correctly. Yay
		});
	});

	stream.on('error', (err) => {
		if (err) {
			throw err;
		}
	});
});