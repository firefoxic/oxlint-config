import { defineConfig, type OxlintConfig } from "oxlint"

import stylistic from "./stylistic.ts"
import syntactic from "./syntactic.ts"

/** Both `syntactic` and `stylistic` configs combined. */
const config: OxlintConfig = defineConfig({
	"extends": [
		syntactic,
		stylistic,
	],
})

export { stylistic, syntactic }
export default config
