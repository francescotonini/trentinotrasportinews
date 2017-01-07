const fallback = require('./../config/config.fallback.json');

module.exports = (key) => {
	return process.env[key] || fallback[key];
};
