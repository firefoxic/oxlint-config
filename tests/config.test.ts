import { existsSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import config, { stylistic, syntactic } from "../src/index.ts"
import { PLUGIN_PATHS, resolvePluginSpecifiers } from "../src/plugins.ts"

describe(`syntactic`, () => {
	it(`uses only built-in plugins`, () => {
		expect(syntactic).not.toHaveProperty(`jsPlugins`)
		expect(syntactic.plugins).toContain(`eslint`)
	})

	it(`enables every category as an error`, () => {
		expect(Object.values(syntactic.categories ?? {})).toEqual([`error`, `error`, `error`, `error`, `error`, `error`])
	})
})

describe(`stylistic`, () => {
	it(`references every JS plugin by an absolute path to an existing file`, () => {
		expect(stylistic.jsPlugins).toHaveLength(PLUGIN_PATHS.length)

		for (let specifier of stylistic.jsPlugins ?? []) {
			expect(typeof specifier).toBe(`string`)
			expect(path.isAbsolute(specifier as string)).toBe(true)
			expect(existsSync(specifier as string)).toBe(true)
		}
	})

	it(`enables only rules of the loaded JS plugins or built-in plugins`, () => {
		let prefixes = [`@stylistic/`, `simple-import-sort/`, `enough-is-enough/`, `import/`, `unicorn/`]

		for (let rule of Object.keys(stylistic.rules ?? {})) {
			let prefixed = prefixes.some((prefix) => rule.startsWith(prefix))

			expect(prefixed || !rule.includes(`/`), rule).toBe(true)
		}
	})
})

describe(`default export`, () => {
	it(`extends both configs in order`, () => {
		expect(config.extends).toEqual([syntactic, stylistic])
	})
})

describe(`resolvePluginSpecifiers`, () => {
	it(`builds relative specifiers for the generated JSON`, () => {
		expect(resolvePluginSpecifiers(`relative`)).toEqual(PLUGIN_PATHS.map((pluginPath) => `./${pluginPath}.js`))
	})
})
