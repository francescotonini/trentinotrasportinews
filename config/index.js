const fallback = require('./../config/example.config.json');

module.exports = (key) => {
	return process.env[key] || fallback[key];
};
