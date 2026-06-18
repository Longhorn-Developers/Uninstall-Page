// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [UnoCSS()],
	},

  adapter: cloudflare(),
});