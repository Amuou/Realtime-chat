import autoAdapter from '@sveltejs/adapter-auto'
import { resolve } from 'path'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: autoAdapter(),
		vite: {
			resolve: {
				alias: {
					$components: resolve('./src/components'),
					$stores: resolve('./src/stores'),
					$actions: resolve('./src/actions'),
					$types: resolve('./src/types'),
					$helpers: resolve('./src/helpers'),
					$routes: resolve('./src/routes'),
					$lib: resolve('./src/lib'),
				},
			},
		},
	},
}

export default config
