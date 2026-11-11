import path from "node:path"
import { fileURLToPath } from "node:url"

import type { ExternalPluginEntry } from "oxlint"

/**
 * JS plugins used by the stylistic config, as paths relative to the package root directory (`src/` in development, `dist/` when published), without extension.
 *
 * The two external plugins (`@stylistic/eslint-plugin` and `eslint-plugin-simple-import-sort`) are re-exported here so that they resolve from this package's own dependencies under pnpm — consumers don't install them. The local `enough-is-enough` plugin lives next to them.
 */
export const PLUGIN_PATHS = [
	`plugins/enough-is-enough/index`,
	`plugins/simple-import-sort`,
	`plugins/stylistic`,
] as const

/**
 * Build `jsPlugins` entries for the stylistic config: absolute file paths, for config objects passed to `extends` in `oxlint.config.ts` (oxlint rejects relative plugin paths in extended objects).
 *
 * The file extension follows the current module: `.ts` while running from `src/`,
 * `.js` once compiled into `dist/`.
 *
 * @returns Entries for the `jsPlugins` field.
 */
export function resolvePluginSpecifiers (): ExternalPluginEntry[] {
	let ext = path.extname(import.meta.filename)

	return PLUGIN_PATHS.map((pluginPath) => fileURLToPath(new URL(`./${pluginPath}${ext}`, import.meta.url)))
}
