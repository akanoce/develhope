/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
		extend: {
			spacing: {
				'128': '32rem',
				'144': '36rem',
				'30': '30%'
			}
		}
	},
	plugins: []
};
