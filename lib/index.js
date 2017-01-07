const Twitter  = require('twitter');
const async    = require('async');
const telegram = require('./telegram.js');
const twitter  = require('./twitter.js');
const logger   = require('./../logger.js');
const config   = require('./../config/');

logger.info('Initializing...');

const client = new Twitter({
	consumer_key: config('TWITTER_CONSUMER_KEY'),
	consumer_secret: config('TWITTER_CONSUMER_SECRET'),
	access_token_key: config('TWITTER_ACCESS_TOKEN_KEY'),
	access_token_secret: config('TWITTER_ACCESS_TOKEN_SECRET')
});

client.stream('statuses/filter', { follow: config('ACCOUNT_TO_FOLLOW') }, (stream) => {
	logger.info('Stream ready');

	stream.on('data', (event) => {
		async.waterfall([
			(cb) => {
				logger.debug('MAIL TIME!');

				cb(null, event);
			},
			twitter.onData,
			telegram.send
		], (err) => {
			if (err) {
				logger.error(err);
			}
		});
	});

	stream.on('error', (err) => {
		if (err) {
			throw err;
		}
	});
});