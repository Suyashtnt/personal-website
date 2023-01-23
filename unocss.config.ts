import {variants, type Labels, type Color, type AlphaColor} from '@catppuccin/palette'
import { defineConfig, extractorSvelte, presetUno } from 'unocss'
import presetTheme from 'unocss-preset-theme'
import type { Theme } from 'unocss/preset-uno'

// get the hex value of the color, and then set the color to the hex value
const createTheme = (colors: Labels<Color, AlphaColor>)=> 
    {
        let vals = Object.fromEntries(Object.entries(colors).map(([key, value])=> [key, value.hex]))
        vals = Object.fromEntries(Object.entries(vals).map(([key, value])=> {
            const [k, v] = key.split(/(?<=[a-z])(?=\d)/)
            if (v) {
                return [k, {[v]: value}]
            } else {
                return [key, value]
            }
        }).filter(([key])=> key))
        return vals
    }

console.log(createTheme(variants.latte))

export default defineConfig<Theme>({
    theme: {
        colors: {
            light: createTheme(variants.latte),
            dark: createTheme(variants.mocha)
        }
    },
    extractors: [extractorSvelte],
    presets: [
        presetUno({
            dark: 'media',
        }),
    ]
})