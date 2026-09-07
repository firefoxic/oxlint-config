/**
 * @file Generate JSON configs for `.oxlintrc.json` consumers into `dist/`.
 */

import { mkdir, writeFile } from "node:fs/promises"

import { resolvePluginSpecifiers } from "../src/plugins.ts"
import { createStylistic } from "../src/stylistic.ts"
import syntactic from "../src/syntactic.ts"

let distDir = new URL(`../dist/`, import.meta.url)

let configs = {
	"syntactic.json": syntactic,
	"stylistic.json": createStylistic(resolvePluginSpecifiers(`relative`)),
}

await mkdir(distDir, { recursive: true })

await Promise.all(Object.entries(configs).map(([name, config]) => writeFile(
	new URL(name, distDir),
	`${JSON.stringify(config, null, `\t`)}\n`,
)))
