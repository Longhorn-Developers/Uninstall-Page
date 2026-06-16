// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/vite';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [UnoCSS()],
	},
});
