import type { OxlintConfig } from "oxlint"

/** Rules of the local `enough-is-enough` plugin. */
const enoughIsEnoughRules: NonNullable<OxlintConfig[`rules`]> = {
	"enough-is-enough/no-multiline-named-imports": `error`,
	"enough-is-enough/no-single-quotes-in-imports-and-object-keys": `error`,
	"enough-is-enough/prefer-let": `error`,
}

export default enoughIsEnoughRules
