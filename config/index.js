const fallback = require('./../config/config.json');

module.exports = (key) => {
	return process.env[key] || fallback[key];
};
