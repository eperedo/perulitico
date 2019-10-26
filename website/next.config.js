const withCSS = require('@zeit/next-css');
module.exports = withCSS({
	cssModules: true,
	env: {
		API_URL: process.env.API_URL || 'http://localhost:3001',
	},
});
