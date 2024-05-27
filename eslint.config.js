import js from '@eslint/js';
import masterCssPlugin from '@master/eslint-plugin-css'
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import prettierPlugin from 'eslint-plugin-prettier';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

/** @type {import("eslint").Linter.RulesRecord} */
const defaultRules = {
	...typescriptPlugin.configs.recommended?.rules,
	'arrow-body-style': 'off',
	'no-undef': 'off',
	'prefer-arrow-callback': 'off'
};

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
	{
		ignores: ['.svelte-kit/**/*', 'node_modules/**/*']
	},
	js.configs.recommended,
	{
		files: ['**/*.ts', '**/*.svelte'],
		plugins: masterCssPlugin.configs.flat.plugins,
		rules: masterCssPlugin.configs.flat.rules
	},
	{
		files: ['**/*.js', '**/*.cjs']
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2020,
				extraFileExtensions: ['.svelte'],
				project: './tsconfig.json',
				sourceType: 'module'
			}
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
			prettier: prettierPlugin
		},
		rules: {
			...defaultRules,
			'prettier/prettier': ['error']
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: typescriptParser
			}
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
			// prettier: prettierPlugin,
			svelte: sveltePlugin
		},
		processor: 'svelte/svelte',
		rules: {
			...defaultRules,
			...sveltePlugin.configs.recommended.rules
			// ...sveltePlugin.configs.prettier.rules,
		}
	},
	perfectionistNatural,
	prettier
];
