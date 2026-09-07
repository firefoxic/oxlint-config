/**
 * @file Rewrite `.ts` import extensions to `.js` in the emitted declaration files.
 *
 * `rewriteRelativeImportExtensions` only rewrites specifiers in the emitted
 * JavaScript, while the declaration files keep the `.ts` extension used in sources.
 */

import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

let distDir = fileURLToPath(new URL(`../dist/`, import.meta.url))
let extensionPattern = /(?<=\bfrom\s+"\.{1,2}\/[^"]+)\.ts(?=")/gu

let entries = await readdir(distDir, { recursive: true })
let files = entries.filter((name) => name.endsWith(`.d.ts`))

await Promise.all(files.map(async (name) => {
	let file = path.join(distDir, name)
	let source = await readFile(file, `utf8`)
	let rewritten = source.replaceAll(extensionPattern, `.js`)

	if (rewritten !== source) await writeFile(file, rewritten)
}))
