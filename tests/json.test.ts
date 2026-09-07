import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { describe, expect, it } from "vitest"

import { createStylistic } from "../src/stylistic.ts"
import syntactic from "../src/syntactic.ts"

let distDir = fileURLToPath(new URL(`../dist/`, import.meta.url))

function readJson (name: string): Record<string, unknown> {
	return JSON.parse(readFileSync(path.join(distDir, name), `utf8`)) as Record<string, unknown>
}

describe(`generated JSON configs`, () => {
	it(`syntactic.json equals the TS config`, () => {
		expect(readJson(`syntactic.json`)).toEqual(JSON.parse(JSON.stringify(syntactic)))
	})

	it(`stylistic.json equals the TS config with relative plugin paths`, () => {
		let json = readJson(`stylistic.json`)
		let jsPlugins = json.jsPlugins as string[]

		expect(json).toEqual(JSON.parse(JSON.stringify(createStylistic(jsPlugins))))
	})

	it(`stylistic.json points to plugin files that exist next to it`, () => {
		let jsPlugins = readJson(`stylistic.json`).jsPlugins as string[]

		expect(jsPlugins.length).toBeGreaterThan(0)

		for (let specifier of jsPlugins) {
			expect(specifier.startsWith(`./`), specifier).toBe(true)
			expect(existsSync(path.join(distDir, specifier)), specifier).toBe(true)
		}
	})
})
