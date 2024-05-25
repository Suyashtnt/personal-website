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
		// surfaces
		base: {
			'@light': 'oklch(90% 0.03 284)',
			'@dark': 'oklch(13% 0.03 284)'
		},
		surface: {
			'@light': 'oklch(85% 0.05 284)',
			'@dark': 'oklch(15% 0.05 284)'
		},
		overlay: {
			'@light': 'oklch(95% 0.05 284)',
			'@dark': 'oklch(20% 0.05 284)'
		},
		// accents
		blue: { 
			'@light': 'oklch(77% 0.2 240)',
			'@dark': 'oklch(77% 0.2 240)' 
		},
		green: { 
			'@light': 'oklch(0.77 0.2 152)',
			'@dark': 'oklch(0.77 0.2 152)'
	  },
		mauve: { 
			'@light': 'oklch(0.77 0.2 284)',
			'@dark': 'oklch(0.77 0.2 284)'
		},
		orange: {
			'@light': 'oklch(0.77 0.2 83)',
			'@dark': 'oklch(0.77 0.2 83)'
		},
		primary: {
			'@light': 'oklch(65% 0.2 284)',
			'@dark': 'oklch(35% 0.2 284)'
		},
		red: { 
			'@light': 'oklch(0.62 0.2 27)',
			'@dark': 'oklch(0.62 0.2 27)'
		},
		secondary: { 
			'@light': 'oklch(60% 0.2 240)',
			'@dark': 'oklch(77% 0.2 240)'
		},
		subtle: { 
			'@light': 'oklch(0.3 0.04 284)',
			'@dark': 'oklch(0.3 0.04 284)'
		},
		teal: {
			'@light': 'oklch(0.77 0.2 190)',
			'@dark': 'oklch(0.77 0.2 190)'
		},
		text: {
			base: {
				'@light': 'oklch(20% 0.03 284)',
				'@dark': 'oklch(88% 0.03 284)'
			},
			surface: {
				'@light': 'oklch(18% 0.05 284)',
				'@dark': 'oklch(90% 0.05 284)'
			},
			overlay: {
				'@light': 'oklch(15% 0.07 284)',
				'@dark': 'oklch(94% 0.07 284)'
			},
			primary: {
				'@light': 'oklch(55% 0.3 284)',
				'@dark': 'oklch(77% 0.2 284)'
			},
		}
	}
} satisfies Config;
