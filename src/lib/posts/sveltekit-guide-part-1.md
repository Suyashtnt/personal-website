---
title: "The Sveltekit tutorial: Part 1 | What, why, and how?"
description: "Welcome to your local wobblers guide to Sveltekit. This is an introduction to sveltekit and setting up the project to get stuff done™️."
author: "Suyashtnt"
date: "2023-09-24"
updated: "2023-09-24"
published: false
---

<script lang="ts">
    import Note from "$lib/components/note.svelte"
</script>

<Note>
This post was for metaframeworks in general, but now its Sveltekit only.
</Note>

So, you've heard of Svelte. Maybe you've even tried the [repl](https://svelte.dev/repl).
Maybe you've even heard of Sveltekit, but have no idea what it is.
If thats the case, welcome to the local wobblers guide to it!

## What the hell is Sveltekit anyways?

Sveltekit is a _metaframework_ for Svelte. It adds a bunch of stuff to make app
development easier. From routing to SSR, it's got it all.

> A meta-what?

A metaframework is a framework built on top of a framework.
In this case, Sveltekit is built on top of Svelte.
Svelte is the framework for building your UI. It handles the DOM,
CSS, declarative rendering, and a bunch of other stuff that makes
writing your UI easier. Sveltekit handles higher-level backend stuff,
like routing, SSR, deployment, pre-rendering, compiling, and stuff that
you don't want to do yourself, but isn't related to the UI.

## Why Sveltekit

Now you probably are saying*:
> That's cool and all, but why should I use it when I can just use HTML?

<Note>
    * Paraphrased :)
</Note>

Sveltekit (And Svelte) are both there to make building websites not a pain.
Sure you can use HTML, but you'll have to figure out a bunch of stuff on your own.

Svelte makes JS a lot easier to work with. Instead of having manually
make sure that your frontend is in sync with your internal state, Svelte
handles that sync for you with its declarative UI patterns.
Instead of saying "When the button of ID `btn` is clicked,
change the state of this variable.
Then, change the text of the button to reflect the state of the variable.",
you can say "The text of the button is equal to this variable.
When the button is clicked, change the variable."
The text of the button will update automatically, since it's bound to the variable.
Thats the power of Svelte.

> Alright, but why Sveltekit? Can't I just make my own backend?

Well, you _could_, but it's a lot of work to get routing, SSR,
and making sure your frontend and backend are on the same page about your data model
(You would usually use a REST API, which has many downsides when it comes to typing),
you can just use Sveltekit. You can use the file system to make your routes,
create layouts, and use many of the builtin features to make sure your backend
and frontend have the exact same data model. It even has a bunch of other features
that would require a bunch of work to implement yourself.

> 'ight, I'm sold. How do I get started?

Well then, read on as we create an overly complicated todo app!

## Creating the project

<Note>
This project is setup using Svelte 4, which at the time of writing
is the latest version of Sveltekit. I'll make a new blog for svelte 5.
</Note>

Now its time to setup the project. I'll be using the official template,
and then updating it for some nice modern tooling, along with Nix support.
First, lets setup the project using `npx`. This comes by default with
Node 18+, which is required for Sveltekit.

<Note>
The project is named after the word for "done" in Afrikaans.
</Note>

```sh
npx create-svelte@latest doen
```

Now, follow the prompts. Firstly, select a Skeleton project,
since we won't be needing the stuff in the demo app. For type checking,
use typescript syntax. While sveltekit uses JSDoc, we are writing an app,
which requires a compilation step anyways. Typescript reduces the amount
of errors you'll get at runtime, and makes it easier to write code.

Enable ESLint, Playwright, and Vitest. ESLint is a linter, which makes sure
your code is decent. We'll be adding prettier through eslint later, so don't worry.
Playwright/Vitest are testing frameworks, which we'll be using to test our
app later on.

Lets get into the project directory.

```sh
cd doen
```

### Nix

<Note>
I won't be getting into nix, but if you have nix installed, this is really useful.
You can skip this step if you don't plan on using nix.
</Note>
Lets get into the project directory, and get nix setup.

```sh
nvim flake.nix
```

(You can use any editor you want, but I'll be using neovim to edit files).

Paste in the following `flake.nix`. This is a nix file, which is used to
declaratively set what our project needs to run.

```nix
{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.napalm.url = "github:nix-community/napalm";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.treefmt-nix.url = "github:numtide/treefmt-nix";
  inputs.napalm.inputs.nixpkgs.follows = "nixpkgs";

  outputs = {
    self,
    nixpkgs,
    napalm,
    flake-utils,
    treefmt-nix,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      treefmtEval = treefmt-nix.lib.evalModule pkgs ./treefmt.nix;
    in {
      formatter = treefmtEval.config.build.wrapper;

      packages = rec {
        website = napalm.legacyPackages."${system}".buildPackage ./. {};
        default = website;
      };

      apps = rec {
        website = flake-utils.lib.mkApp {drv = self.packages.${system}.website;};
        default = website;
      };

      checks = {
        formatting = treefmtEval.config.build.check self;
      };

      devShells.default = pkgs.mkShell {
        nativeBuildInputs = with pkgs; [
            nil nodejs alejandra
            nodePackages.svelte-language-server
            nodePackages.typescript-language-server nodePackages.pnpm marksman
        ];
      };
    });
}
```

#### Direnv

I'll also be using `direnv` to manage my environment, so lets get that setup.

Firstly, let's edit the .gitignore pre-emptively.

```sh
# add this to the end of your .gitignore
/.direnv
```

...Now create the git repo

```sh
git init
git add .
```

Now, lets tell direnv to use our nix flake.

```sh
echo "use flake" > .envrc
direnv allow
```

Now, we can finally start working on it!

### Installing dependencies

firstly, lets make sure our dependencies are up-to-date.
I'll be using a neat tool called `npm-check-updates` to do this.

```sh
npx npm-check-updates -u
```

Now lets install using `pnpm`. You can use `npm` or `yarn` if you want.

```sh
pnpm i
```

### Setting up the tooling

Sveltekit comes with a bunch of tooling, but there are a few tools
I like to use. They will all be used in future tutorials, so if some
stuff seems useless, don't worry. It'll be used later.

#### Eslint

The Sveltekit template we chose comes with a bunch of tooling,
but some of it is outdated. Mainly ESLint, which uses the old
config format. I'll be using the new config format, which is
known as the [Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new).

Firstly, lets remove the old config.

```sh
rm .eslintrc.cjs
rm .eslintignore
```

And lets open up the new config.

```sh
nvim eslint.config.js
```

<Note>
Prettier eslint is currently broken and doesn't work with svelte. Thats why I
commented it out. I'll update the post when it works.
</Note>

Paste in the following:

```js
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

```

You may be viewing this and thinking:

> What the hell is this chaos of a config?

Firstly, this config format is a lot more flexible than the old one.
So thats why it looks so complicated. Secondly, this config is a combination
of 8 different configs layered together. This is why its called a flat config.
Each config is layered on top of each other. The first config is the base config,
which ignores the svelte-kit folder (cached files sveltekit uses). Then it uses
the default JS config, which is the recommended default config for JS. Then it
sets up a bunch of default rules for the languages we'll be using (Javascript,
Typescript, Svelte, and CSS via unocss). After that, it sets up a plugin called
"perfectionist." This just makes your code better. I also setup prettier, which
is a code formatter. It makes your code look actually good.

As you can tell, this config imports a ton of plugins, so lets install 'em.

```sh
pnpm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser \
eslint-config-prettier eslint-plugin-prettier prettier prettier-plugin-svelte \
eslint-plugin-svelte svelte-eslint-parser @unocss/eslint-plugin \
eslint-plugin-perfectionist @eslint/js
```

This config will handle everything related to code formatting and linting for you,
so you don't have to worry about it.

#### Code editor

For VSCode, you can use
[Svelte for VSCode](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).
This plugin will handle everything for you, and has some nice code actions for sveltekit.

If you use a Jetbrains IDE, you can use the [Svelte Plugin](https://plugins.jetbrains.com/plugin/12375-svelte).
It works fairly well, but it doesn't have as many features as the VSCode plugin.

For Neovim, Emacs, and most other editors, you can setup the svelte language server.
Check the guide for your specific editor to see how to do this.

#### Svelte-kit

Sveltekit by default is already feature-rich, but there are some things we can
add to make it just that much better.

##### Vite config

Vite is the tool sveltekit uses to compile your app. It's a lot faster than
Webpack and Rollup if you've heard of them.

First, lets install lightningcss and unocss. Lightningcss is a CSS bundler,
transpiler, and optimizer. It's a lot faster than PostCSS, the default CSS
tool for vite, and supports a lot more features. Unocss is a CSS framework
thats similar to Tailwind, but actually decent in terms of speed and size.

```sh
pnpm i -D lightningcss browserslist unocss @unocss/svelte-scoped
```

and lets edit the vite config.

```js
import { sveltekit } from '@sveltejs/kit/vite';
import unoCSS from '@unocss/svelte-scoped/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vitest/config';

const targets = browserslistToTargets(
        browserslist('defaults, not IE 11, not IE_Mob 11, not OperaMini all')
);

export default defineConfig({
        build: {
                cssMinify: 'lightningcss'
        },
        css: {
                devSourcemap: true,
                lightningcss: {
                        drafts: {
                                nesting: true
                        },
                        targets
                },
                transformer: 'lightningcss'
        },
        plugins: [
            unoCSS(),
            sveltekit(),
        ],
        test: {
                include: ['src/**/*.{test,spec}.{js,ts}']
        }
});
```

This sets up vite to use lightningcss as the CSS bundler, and unocss as a CSS framework.

You may also notice this isn't using `unocss`, but `@unocss/svelte-scoped`.
This is because sveltekit has a scoped css system, which unocss can take
advantage of to make your CSS bundles as small as possible. Neat!

###### Unocss changes

Some of svelte-kit's files need to be changed to support unocss.
See [The UnoCSS Docs](https://unocss.dev/integrations/svelte-scoped#global-styles)
on how to do so. It mentions a `hooks.server.js` file.
That file is stored in `src/hooks.server.js`. I've made
it typescript in my app, but you can use the JS version for now.

##### Sveltekit config

The sveltekit config can also be improved a bit.
First, let's setup a tool called [Melt UI](https://www.melt-ui.com).
This is a headless component library for svelte, which has a bunch of components
that can be completely customized. It removes a ton of complexity when making
more advanced components.

```sh
npx @melt-ui/cli@latest init
```

Allow it to install the preprocessor, which is used to compile away a lot
of the boilerplate that comes when using a library like this. Select the default
options for everything else.
I'm also going to edit the sveltekit config to support our custom eslint config better.

```js
import {preprocessMeltUI} from "@melt-ui/pp";
import adapter from '@sveltejs/adapter-auto';
import {vitePreprocess} from '@sveltejs/kit/vite';
import sequence from "svelte-sequential-preprocessor";

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  kit: {
    adapter: adapter(),
    typescript: {
        config(config) {
            config.include.push("../vite.config.ts");
            config.include.push("../eslint.config.js");
            config.include.push("../playwright.config.ts");
            return config;
        },
    },
  },
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()])
};
export default config;
```

run `npx svelte-kit sync` to sync svelte-kits build cache with the new config.
You should also now be able to run `npx eslint . --fix` to fix any linting errors.

#### Booting up the server

You are now finally ready to start the server!

```sh
pnpm run dev
```

You'll be greeted to a fairly basic website on load, but
soon enough this will become an overly complicated todo app!

The next blog post will be about understanding the project structure,
and creating some basic functionality for our todo app. While this post
may not be the most exciting, it's important to get the tooling setup
before diving head first into the project
