import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { Ajv } from "ajv"
import { describe, expect, it } from "vitest"

import { createStylistic } from "../src/stylistic.ts"
import syntactic from "../src/syntactic.ts"

let distDir = fileURLToPath(new URL(`../dist/`, import.meta.url))
let schemaFile = fileURLToPath(new URL(`../node_modules/oxlint/configuration_schema.json`, import.meta.url))

type Json = Record<string, unknown>

function readJson (file: string): Json {
	return JSON.parse(readFileSync(file, `utf8`)) as Json
}

function readConfig (name: string): { $schema: unknown, config: Json } {
	let { $schema, ...config } = readJson(path.join(distDir, name))

	return { $schema, config }
}

let ajv = new Ajv({ allErrors: true, strict: false, validateFormats: false })
let validate = ajv.compile(readJson(schemaFile))

describe.each([`syntactic.json`, `stylistic.json`])(`generated %s`, (name) => {
	it(`points to oxlint's schema next to the package in node_modules`, () => {
		expect(readConfig(name).$schema).toBe(`../../../oxlint/configuration_schema.json`)
	})

	it(`is valid against oxlint's configuration schema`, () => {
		let { config } = readConfig(name)

		expect(validate(config), ajv.errorsText(validate.errors)).toBe(true)
	})
})

describe(`generated JSON configs`, () => {
	it(`syntactic.json equals the TS config`, () => {
		expect(readConfig(`syntactic.json`).config).toEqual(JSON.parse(JSON.stringify(syntactic)))
	})

	it(`stylistic.json equals the TS config with relative plugin paths`, () => {
		let { config } = readConfig(`stylistic.json`)
		let jsPlugins = config.jsPlugins as string[]

		expect(config).toEqual(JSON.parse(JSON.stringify(createStylistic(jsPlugins))))
	})

	it(`stylistic.json points to plugin files that exist next to it`, () => {
		let jsPlugins = readConfig(`stylistic.json`).config.jsPlugins as string[]

		expect(jsPlugins.length).toBeGreaterThan(0)

		for (let specifier of jsPlugins) {
			expect(specifier.startsWith(`./`), specifier).toBe(true)
			expect(existsSync(path.join(distDir, specifier)), specifier).toBe(true)
		}
	})
})
