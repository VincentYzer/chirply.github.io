import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: "#1c454a",
				secondary: "#1c2e4a",
				accent: "#211c4a",
			  },
		}
	},

	plugins: []
} satisfies Config;
