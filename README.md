# @firefoxic/oxlint-config

[![License: MIT][license-image]][license-url]
[![Changelog][changelog-image]][changelog-url]
[![Test Status][test-image]][test-url]

Shared config for oxlint by [firefoxic](https://github.com/firefoxic).

The configuration consists of two parts:

- [syntactic](./src/syntactic.ts) rules — oxlint's built-in plugins with every category enabled,
- [stylistic](./src/stylistic.ts) rules — formatting rules provided by JS plugins: [`@stylistic`](https://eslint.style), [`simple-import-sort`](https://github.com/lydell/eslint-plugin-simple-import-sort) and the local [`enough-is-enough`](./src/plugins/enough-is-enough) plugin.

## Installation

```sh
pnpm add -D oxlint @firefoxic/oxlint-config
```

## Usage

### `oxlint.config.ts`

Import the config and pass it to `extends`:

```ts
import config from "@firefoxic/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
	extends: [config],
	env: {
		node: true,
	},
	rules: {
		// Your rules
	},
	overrides: [
		// Your overrides
		{
			files: [`**/*.test.{js,ts}`],
			rules: {
				"no-undefined": `off`,
			},
		},
	],
})
```

The two parts are also exported separately, in case you need only one of them:

```ts
import { stylistic, syntactic } from "@firefoxic/oxlint-config"
// or
import syntactic from "@firefoxic/oxlint-config/syntactic"
import stylistic from "@firefoxic/oxlint-config/stylistic"
```

### `.oxlintrc.json`

The JSON format cannot import packages, so extend the generated JSON files by their paths in `node_modules`:

```json
{
	"$schema": "./node_modules/oxlint/configuration_schema.json",
	"extends": [
		"./node_modules/@firefoxic/oxlint-config/dist/syntactic.json",
		"./node_modules/@firefoxic/oxlint-config/dist/stylistic.json"
	],
	"env": {
		"node": true
	},
	"rules": {
		// Your rules
	},
	"overrides": [
		// Your overrides
		{
			"files": [
				"**/*.test.{js,ts}"
			],
			"rules": {
				"no-undefined": "off"
			}
		}
	]
}
```

## Custom rules

The `enough-is-enough` plugin ships with the stylistic part and adds three rules. All of them are auto-fixable, except for `var` declarations reported by `prefer-let`.

### `enough-is-enough/no-multiline-named-imports`

Named imports must stay on one line. The fix joins the specifiers and keeps a default or namespace import in front of them.

```js
// 🚫
import {
	readFile,
	writeFile,
} from "node:fs/promises"

// ✅
import { readFile, writeFile } from "node:fs/promises"
```

### `enough-is-enough/no-single-quotes-in-imports-and-object-keys`

Import and export sources, as well as quoted object keys, must use double quotes. Together with `@stylistic/quotes` set to `backtick`, this leaves exactly one quote style for every kind of string.

```js
// 🚫
import path from 'node:path'
export * from './utils.js'
let headers = { 'content-type': `text/html` }

// ✅
import path from "node:path"
export * from "./utils.js"
let headers = { "content-type": `text/html` }
```

### `enough-is-enough/prefer-let`

`const` is allowed only at the top level of a module or script, where it declares a true constant. Inside functions and blocks a binding is declared with `let`, and `var` is never allowed (except inside ambient `declare` blocks in TypeScript). See the [rationale](./src/plugins/enough-is-enough/prefer-let/index.md).

```js
// 🚫
function area (radius) {
	const r2 = radius * radius

	return PI * r2
}

// ✅
const PI = 3.14

function area (radius) {
	let r2 = radius * radius

	return PI * r2
}
```

The rule contradicts `prefer-const` from oxlint's `style` category, which this config does not enable. Keep `prefer-const` off if you turn that category on.

[license-url]: https://github.com/firefoxic/oxlint-config/blob/main/LICENSE.md
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[changelog-url]: https://github.com/firefoxic/oxlint-config/blob/main/CHANGELOG.md
[changelog-image]: https://img.shields.io/badge/CHANGELOG-md-limegreen

[test-url]: https://github.com/firefoxic/oxlint-config/actions
[test-image]: https://github.com/firefoxic/oxlint-config/actions/workflows/test.yaml/badge.svg?branch=main
