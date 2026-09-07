import path from "node:path"
import { fileURLToPath } from "node:url"

import type { ExternalPluginEntry } from "oxlint"

/**
 * JS plugins used by the stylistic config, as paths relative to the package
 * root directory (`src/` in development, `dist/` when published), without extension.
 */
export const PLUGIN_PATHS = [
	`plugins/enough-is-enough/index`,
	`plugins/simple-import-sort`,
	`plugins/stylistic`,
] as const

export type PluginSpecifierMode = `absolute` | `relative`

/**
 * Build `jsPlugins` entries for the stylistic config.
 *
 * - `absolute`: absolute file paths, for config objects passed to `extends` in
 *   `oxlint.config.ts` (oxlint rejects relative plugin paths in extended objects).
 * - `relative`: paths relative to the generated JSON config files in `dist/`.
 *
 * The file extension follows the current module: `.ts` while running from `src/`,
 * `.js` once compiled into `dist/`.
 *
 * @param mode - Which kind of specifiers to build.
 * @returns Entries for the `jsPlugins` field.
 */
export function resolvePluginSpecifiers (mode: PluginSpecifierMode): ExternalPluginEntry[] {
	let ext = mode === `absolute` ? path.extname(import.meta.filename) : `.js`

	return PLUGIN_PATHS.map((pluginPath) => {
		let file = `./${pluginPath}${ext}`

		return mode === `absolute` ? fileURLToPath(new URL(file, import.meta.url)) : file
	})
}
