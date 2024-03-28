/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/sections/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: '#60B896',
				secondary: '#E45F3B',
				accent: '#9747FF',
				text: {
					DEFAULT: 'black',
					gray: '#959595',
					blackGray: '#484848',
					red: '#EE685F',
					blue: '#2FAACC',
					blackBlue: '#252B42',
				},
				background: {
					DEFAULT: '#F5F5F5',
					nav: 'white',
					landing: 'white',
				},
				// Define status colors
				status: {
					active: '#10B981', // Green for Active status
					passive: '#EF4444', // Red for Passive status
					// Add more status colors as needed
				},
			},
			fontFamily: {
				sans: ['var(--montserrat-variable)', ...fontFamily.sans],
				serif: ['var(--sedgwick-variable)', ...fontFamily.serif],
			},
			animation: {
				'bounce-fast': 'bounce .8s infinite',
			},
			keyframes: {
				bounce: {
					'0%, 100%': {
						transform: 'translateY(-70%)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
					},
					'50%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
					},
				},
			},
		},
	},
	plugins: [],
};
