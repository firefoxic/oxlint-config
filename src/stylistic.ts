import { defineConfig, type ExternalPluginEntry, type OxlintConfig } from "oxlint"

import enoughIsEnoughRules from "./stylistic/enough-is-enough.ts"
import eslintRules from "./stylistic/eslint.ts"
import simpleImportSortRules from "./stylistic/simple-import-sort.ts"
import stylisticRules from "./stylistic/stylistic.ts"
import { resolvePluginSpecifiers } from "./plugins.ts"

/**
 * Create the stylistic config with the given `jsPlugins` entries.
 *
 * The plugin specifiers differ between the config object exported for
 * `oxlint.config.ts` (absolute paths) and the generated JSON files (relative paths).
 *
 * @param jsPlugins - Entries for the `jsPlugins` field.
 * @returns The stylistic config.
 */
export function createStylistic (jsPlugins: ExternalPluginEntry[]): OxlintConfig {
	return defineConfig({
		jsPlugins,
		categories: {
			// "style": `error`,
		},
		env: {
			"builtin": true,
			"shared-node-browser": true,
		},
		globals: {
			Buffer: `readonly`,
			clearImmediate: `readonly`,
			global: `readonly`,
			process: `readonly`,
			setImmediate: `readonly`,
		},
		rules: {
			...eslintRules,
			...enoughIsEnoughRules,
			...simpleImportSortRules,
			...stylisticRules,
		},
	})
}

/** Rules that need JS plugins: `@stylistic`, `simple-import-sort` and the local `enough-is-enough`. */
export default createStylistic(resolvePluginSpecifiers(`absolute`))
