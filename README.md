# @firefoxic/oxlint-config

[![License: MIT][license-image]][license-url]
[![Changelog][changelog-image]][changelog-url]
[![NPM version][npm-image]][npm-url]
[![Test Status][test-image]][test-url]

Shared config for oxlint by [firefoxic](https://github.com/firefoxic).

The configuration consists of two parts:

- [syntactic](./lib/syntactic.jsonc) rules,
- [stylistic](./lib/stylistic.jsonc) rules.

## Installation

```sh
pnpm add -D oxlint @firefoxic/oxlint-config
```

## Usage

Set your `.oxlintrc.json` to:

```json
{
	"$schema": "./node_modules/oxlint/configuration_schema.json",
	"extends": [
		"./node_modules/@firefoxic/oxlint-config/lib/syntactic.jsonc",
		"./node_modules/@firefoxic/oxlint-config/lib/stylistic.jsonc"
	],
	"categories": {
		"style": "warn"
	},
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

[npm-url]: https://npmjs.org/package/@firefoxic/oxlint-config
[npm-image]: https://badge.fury.io/js/@firefoxic%2Foxlint-config.svg

[test-url]: https://github.com/firefoxic/oxlint-config/actions
[test-image]: https://github.com/firefoxic/oxlint-config/actions/workflows/test.yaml/badge.svg?branch=main
