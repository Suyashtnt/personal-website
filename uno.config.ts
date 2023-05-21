import { variants, type Labels, type Color, type AlphaColor } from '@catppuccin/palette';
import {
	defineConfig,
	presetIcons,
	presetUno,
	presetTypography,
	transformerDirectives
} from 'unocss';
import type { Theme } from 'unocss/preset-uno';

// get the hex value of the color, and then set the color to the hex value
const createTheme = (colors: Labels<Color, AlphaColor>) => {
	let vals = Object.fromEntries(Object.entries(colors).map(([key, value]) => [key, value.hex]));
	vals = Object.entries(vals)
		// turn overlay0, overlay1 into an object, containing {
		//   '0': '#000000',
		//   '1': '#000000'
		// }
		// so that we can use overlay-0 and overlay-1 in the theme
		// do the same for all that contain numbers
		// (yes, I used copilot here)
		.reduce((acc, [key, value]) => {
			const match = key.match(/^(?<name>.+?)(?<num>\d+)$/);
			if (match?.groups) {
				const { name, num } = match.groups;
				if (!acc[name]) {
					acc[name] = {};
				}
				acc[name][num] = value;
				return acc;
			}
			acc[key] = value;
			return acc;
		}, {} as Record<string, string | Record<string, string>>);
	return vals;
};

export default defineConfig<Theme>({
	theme: {
		colors: {
			light: createTheme(variants.latte),
			dark: createTheme(variants.mocha)
		}
	},
	transformers: [transformerDirectives()],
	presets: [
		presetIcons(),
		presetUno({
			dark: 'media'
		}),
		presetTypography()
	]
});
