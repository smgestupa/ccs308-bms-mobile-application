/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require("daisyui")],

	daisyui: {
		themes: [{
			light: {
				"primary": "#4be2ed",
				"secondary": "#c3f45a",
				"accent": "#f79eec",
				"neutral": "#4f4455",
				"base-100": "#32434e",
				"info": "#6984ce",
				"success": "#3de18c",
				"warning": "#f3ab5e",
				"error": "#f87272"
			}
		}],
		darkTheme: 'false'
	}
};

module.exports = config;
