import noMultilineNamedImports from "./no-multiline-named-imports/index.ts"
import noSingleQuotesInImportsAndObjectKeys from "./no-single-quotes-in-imports-and-object-keys/index.ts"
import preferLet from "./prefer-let/index.ts"
import type { Plugin } from "./types.ts"

const plugin: Plugin = {
	meta: {
		name: `eslint-plugin-enough-is-enough`,
	},
	rules: {
		"no-multiline-named-imports": noMultilineNamedImports,
		"no-single-quotes-in-imports-and-object-keys": noSingleQuotesInImportsAndObjectKeys,
		"prefer-let": preferLet,
	},
}

export default plugin
