const winston = require('winston');
const logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			level: process.env['NODE_ENV'] == 'development' ? 'debug' : 'info',
			timestamp: true,
			colorize: true,
			handleExceptions: true,
			humanReadableUnhandledException: true
		})
	]
});

module.exports = logger;