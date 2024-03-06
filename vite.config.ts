import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use '$lib/index.scss' as *;`
            },
        },
    },
	build: {
		sourcemap: true
	},
	server: {
		port: 5002,
		open: true,
		host: true
	},
	plugins: [
		sveltekit()
	]
});
