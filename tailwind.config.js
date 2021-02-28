const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
	purge: {
		content: [
			"./src/**/*.html",
			"./src/**/*.svelte",
		],
		options: {
			defaultExtractor: (content) => [
				// This is an internal Tailwind function that we're not supposed to be allowed to use
				// So if this stops working, please open an issue at
				// https://github.com/babichjacob/sapper-postcss-template/issues
				// rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
			keyframes: true,
		},
	},
	theme: {
		extend: {
			// Font Size
			fontSize: {
				'extra-xs': '.65rem'
			},

			// Font Family
			fontFamily: {
				'primary': 'Montserrat, sans-serif;'
			},

			// Background Color
			backgroundColor: {
				'icon-button': '#262b3f',

				'input': '#0d0f17',
				'container': '#151820',

				'gradient-01': 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'
			},

			// Padding
			padding: {
				"0%": "0",
				"10%": "10%",
				"20%": "20%",
				"30%": "30%",
				"35%": "35%",
				"40%": "40%",
				"45%": "45%",
				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"75%": "75%",
				"80%": "80%",
				"90%": "90%",
				"100%": "100%",
				"110%": "110%",
				"120%": "120%",
				"150%": "150%"
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
