import { execFile } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"

import { describe, expect, it } from "vitest"

let rootDir = fileURLToPath(new URL(`../`, import.meta.url))
let oxlint = path.join(rootDir, `node_modules/.bin/oxlint`)

type Diagnostic = {
	filename: string,

	/** `plugin(rule)`, absent for configuration errors. */
	code?: string,
	message: string,
}

type Report = {
	diagnostics: Diagnostic[],
}

async function lint (fixture: string, configFile: string): Promise<Diagnostic[]> {
	let fixtureDir = path.join(rootDir, `fixtures`, fixture)
	let { stdout } = await promisify(execFile)(
		oxlint,
		[`--config`, path.join(fixtureDir, configFile), `--format`, `json`, fixtureDir],
		{ cwd: fixtureDir },
	).catch((error: { stdout: string, stderr: string }) => {
		// oxlint exits with 1 when it finds errors, which is what we want.
		if (!error.stdout) throw new Error(error.stderr)

		return error
	})

	return (JSON.parse(stdout) as Report).diagnostics
}

function rulesOf (diagnostics: Diagnostic[], file: string): string[] {
	return diagnostics
		.filter((d) => d.filename.endsWith(file))
		.map((d) => d.code ?? d.message)
}

let expectedRules = [
	`enough-is-enough(prefer-let)`,
	`enough-is-enough(no-multiline-named-imports)`,
	`enough-is-enough(no-single-quotes-in-imports-and-object-keys)`,
	`@stylistic(quotes)`,
	`@stylistic(semi)`,
	`simple-import-sort(imports)`,
	`eslint(no-var)`,
]

describe.each([
	[`ts-config`, `config.ts`],
	[`json-config`, `config.json`],
])(`fixture %s`, (fixture, configFile) => {
	it(`loads the config and reports rules of every plugin`, async () => {
		let diagnostics = await lint(fixture, configFile)
		let configErrors = diagnostics.filter((d) => !d.code)

		expect(configErrors, JSON.stringify(configErrors, null, 2)).toEqual([])

		let rules = rulesOf(diagnostics, `sample.ts`)

		for (let rule of expectedRules) expect(rules, rules.join(`\n`)).toContain(rule)
	})

	it(`reports nothing on clean code`, async () => {
		let diagnostics = await lint(fixture, configFile)

		expect(rulesOf(diagnostics, `clean.ts`)).toEqual([])
	})
})
