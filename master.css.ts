import type { Config } from '@master/css';

export default {
	animations: {},
	functions: {},
	modes: {
		dark: 'media',
		light: 'media'
	},
	queries: {},
	rules: {},
	selectors: {},
	styles: {},
	variables: {
		base: {
			'@dark': 'oklch(13% 0.03 284)'
		},
		blue: { '@dark': 'oklch(77% 0.2 240)' },
		green: { '@dark': 'oklch(0.77 0.2 152)' },
		mauve: { '@dark': 'oklch(0.77 0.2 284)' },
		orange: { '@dark': 'oklch(0.77 0.2 83)' },
		overlay: {
			'@dark': 'oklch(20% 0.05 284)'
		},
		primary: {
			'@dark': 'oklch(35% 0.2 284)'
		},
		red: { '@dark': 'oklch(0.62 0.2 27)' },
		secondary: { '@dark': 'oklch(77% 0.2 240)' },
		subtle: { '@dark': 'oklch(0.3 0.04 284)' },
		surface: {
			'@dark': 'oklch(15% 0.05 284)'
		},
		teal: { '@dark': 'oklch(0.77 0.2 190)' },
		text: {
			base: {
				'@dark': 'oklch(88% 0.03 284)'
			},
			overlay: {
				'@dark': 'oklch(94% 0.07 284)'
			},
			primary: {
				'@dark': 'oklch(77% 0.2 284)'
			},
			surface: {
				'@dark': 'oklch(90% 0.05 284)'
			}
		}
	}
} satisfies Config;
