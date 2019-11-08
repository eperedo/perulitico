const withCSS = require('@zeit/next-css');
module.exports = withCSS({
	cssModules: true,
	env: {
		API_URL: process.env.API_URL || 'http://localhost:3001',
		SITE_DOMAIN:
			process.env.SITE_DOMAIN || 'https://perulitico-website.eperedo.now.sh',
	},
});
