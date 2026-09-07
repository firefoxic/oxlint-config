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

[license-url]: https://github.com/firefoxic/oxlint-config/blob/main/LICENSE.md
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[changelog-url]: https://github.com/firefoxic/oxlint-config/blob/main/CHANGELOG.md
[changelog-image]: https://img.shields.io/badge/CHANGELOG-md-limegreen

[test-url]: https://github.com/firefoxic/oxlint-config/actions
[test-image]: https://github.com/firefoxic/oxlint-config/actions/workflows/test.yaml/badge.svg?branch=main
