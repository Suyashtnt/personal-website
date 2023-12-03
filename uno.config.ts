import { type AlphaColor, type Color, type Labels, variants } from '@catppuccin/palette';
import { presetHeroPatterns } from '@julr/unocss-preset-heropatterns';
import {
	defineConfig,
	presetIcons,
	presetTypography,
	presetUno,
	transformerDirectives
} from 'unocss';

import darkTheme from './kleur-dark.json' assert { type: 'json' };

// Get the hex value of the color, and then set the color to the hex value
const createTheme = (colors: Labels<Color, AlphaColor>) => {
	const values = Object.fromEntries(
		Object.entries(colors).map(([key, value]) => [key, value.hex])
	);
	const vals = Object.entries(values);

	const finalTheme: Record<string, Record<string, string> | string> = {};

	for (const [key, value] of vals) {
		const keyContainsNumber = /\d/.test(key);
		if (keyContainsNumber) {
			const [_name, _number] = key.split(/(?<=\D)(?=\d)|(?<=\d)(?=\D)/);
			const name = _name!;
			const number = _number!;

			const hasNameAlready = finalTheme[name] !== undefined;
			if (!hasNameAlready) {
				finalTheme[name] = {};
			}

			const objectToAddValueTo = finalTheme[name]!;

			if (typeof objectToAddValueTo === 'string')
				throw new Error(`Theme key ${name.toString()} is already a string`);

			objectToAddValueTo[number] = value;
		} else {
			finalTheme[key] = value;
		}
	}

	return finalTheme;
};

const flattenTheme = (theme: typeof darkTheme) => {
	const flattenedTheme: Record<string, string> = {};

	for (const [key, value] of Object.entries(theme)) {
		if (typeof value === 'string') {
			flattenedTheme[key] = value;
		} else {
			for (const [number, color] of Object.entries(value)) {
				flattenedTheme[`${key}_${number}`] = color;
			}
		}
	}

	return flattenedTheme;
};

export default defineConfig({
	presets: [
		presetIcons(),
		presetUno({
			dark: 'media'
		}),
		presetTypography(),
		// @ts-expect-error This is a valid preset
		presetHeroPatterns()
	],
	rules: [
		[
			'casl',
			{
				'font-variation-settings': '"CASL" 1'
			}
		]
	],
	theme: {
		colors: {
			dark: flattenTheme(darkTheme),
			light: createTheme(variants.latte)
		}
	},
	transformers: [transformerDirectives()]
});
