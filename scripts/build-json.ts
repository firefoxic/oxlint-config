/**
 * @file Generate JSON configs for `.oxlintrc.json` consumers into `dist/`.
 */

import { mkdir, writeFile } from "node:fs/promises"

import { resolvePluginSpecifiers } from "../src/plugins.ts"
import { createStylistic } from "../src/stylistic.ts"
import syntactic from "../src/syntactic.ts"

let distDir = new URL(`../dist/`, import.meta.url)

/**
 * Path to oxlint's JSON schema from `node_modules/@firefoxic/oxlint-config/dist/`
 * in a consumer project, where `oxlint` is a direct dependency.
 */
let schema = `../../../oxlint/configuration_schema.json`

let configs = {
	"syntactic.json": { $schema: schema, ...syntactic },
	"stylistic.json": { $schema: schema, ...createStylistic(resolvePluginSpecifiers(`relative`)) },
}

await mkdir(distDir, { recursive: true })

await Promise.all(Object.entries(configs).map(([name, config]) => writeFile(
	new URL(name, distDir),
	`${JSON.stringify(config, null, `\t`)}\n`,
)))
