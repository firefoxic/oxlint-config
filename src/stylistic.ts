import { defineConfig, type ExternalPluginEntry, type OxlintConfig } from "oxlint"

import enoughIsEnoughRules from "./stylistic/enough-is-enough.ts"
import eslintRules from "./stylistic/eslint.ts"
import perfectionistRules from "./stylistic/perfectionist.ts"
import stylisticRules from "./stylistic/stylistic.ts"
import { resolvePluginSpecifiers } from "./plugins.ts"

/**
 * Create the stylistic config with the given `jsPlugins` entries (absolute file paths to the JS plugins).
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
			...perfectionistRules,
			...stylisticRules,
		},
	})
}

/** Rules that need JS plugins: `@stylistic`, `perfectionist` and the local `enough-is-enough`. */
export default createStylistic(resolvePluginSpecifiers())
