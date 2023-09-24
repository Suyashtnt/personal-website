import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import unocssPlugin from "@unocss/eslint-plugin";
import prettier from "eslint-config-prettier";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
import prettierPlugin from "eslint-plugin-prettier";
import sveltePlugin from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";

const prettierConfig = {
    overrides: [
        {
            files: "*.svelte",
            options: {
                parser: "svelte",
            },
        },
    ],
    plugins: ["prettier-plugin-svelte"],
    printWidth: 100,
    singleQuote: true,
    trailingComma: "none",
    useTabs: true,
};

/** @type {import("eslint").Linter.RulesRecord} */
const defaultRules = {
    ...typescriptPlugin.configs.recommended.rules,
    "arrow-body-style": "off",
    "no-undef": "off",
    "prefer-arrow-callback": "off",
};

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
    {
        ignores: [".svelte-kit/**/*"],
    },
    js.configs.recommended,
    {
        plugins: {
            "@unocss": unocssPlugin,
        },
        rules: unocssPlugin.configs.recommended.rules,
    },
    {
        files: ["**/*.js", "**/*.cjs"],
    },
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2020,
                extraFileExtensions: [".svelte"],
                project: "./tsconfig.json",
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": typescriptPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...defaultRules,
            "prettier/prettier": [
                "error",
                prettierConfig,
                {
                    usePrettierrc: false,
                },
            ],
        }
    },
    {
        files: ["**/*.svelte"],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: typescriptParser,
            },
        },
        plugins: {
            "@typescript-eslint": typescriptPlugin,
            // prettier: prettierPlugin,
            svelte: sveltePlugin,
        },
        processor: "svelte/svelte",
        rules: {
            ...defaultRules,
            ...sveltePlugin.configs.recommended.rules,
            // ...sveltePlugin.configs.prettier.rules,
        },
    },
    perfectionistNatural,
    prettier,
];
