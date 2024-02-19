import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { cataclysm } from './theme';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		skeleton({
			themes: {
				custom: [cataclysm],
				preset: [
					{
						name: 'wintry',
						enhancements: true,
					},
					{
						name: 'skeleton',
						enhancements: true,
					},
				],
			},
		}),
	],
};
