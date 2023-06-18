import {
    type AlphaColor,
    type Color,
    type Labels,
    variants
} from '@catppuccin/palette';
import {
    defineConfig,
    presetIcons,
    presetTypography,
    presetUno,
    transformerDirectives
} from 'unocss';
import {presetHeroPatterns} from '@julr/unocss-preset-heropatterns';

// Get the hex value of the color, and then set the color to the hex value
const createTheme = (colors: Labels<Color, AlphaColor>) => {
    const values = Object.fromEntries(
        Object.entries(colors).map(([key, value]) => [key, value.hex])
    );
    const vals = Object.entries(values);

    const finalTheme: Record<
        string,
        Record<string, string> | string
    > = {};

    for (const [key, value] of vals) {
        const keyContainsNumber = /\d/.test(key);
        if (keyContainsNumber) {
            const [name, number] = key.split(
                /(?<=\D)(?=\d)|(?<=\d)(?=\D)/
            );

            const hasNameAlready = finalTheme[name] !== undefined;
            if (!hasNameAlready) {
                finalTheme[name] = {};
            }

            const objectToAddValueTo = finalTheme[name];

            if (typeof objectToAddValueTo === 'string')
                throw new Error(
                    `Theme key ${name.toString()} is already a string`
                );

            objectToAddValueTo[number] = value;
        } else {
            finalTheme[key] = value;
        }
    }

    return finalTheme;
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
    theme: {
        colors: {
            dark: createTheme(variants.mocha),
            light: createTheme(variants.latte)
        }
    },
    transformers: [transformerDirectives()]
});
