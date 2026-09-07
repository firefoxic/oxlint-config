import type { OxlintConfig } from "oxlint"

/** Style rules of oxlint's built-in plugins that are not part of any category. */
const eslintRules: NonNullable<OxlintConfig[`rules`]> = {
	"arrow-body-style": `error`,
	"curly": [
		`error`,
		`multi-line`,
	],
	"default-case-last": `error`,
	"default-param-last": `error`,
	"func-style": [
		`error`,
		`declaration`,
	],
	"grouped-accessor-pairs": [
		`error`,
		`getBeforeSet`,
		{
			enforceForTSTypes: true,
		},
	],
	"guard-for-in": `error`,
	"no-multi-assign": `error`,
	"no-return-assign": `error`,
	"object-shorthand": `error`,
	"prefer-object-has-own": `error`,
	"prefer-template": `error`,
	"import/exports-last": `error`,
	"import/first": `error`,
	"import/newline-after-import": `error`,
	"unicorn/no-nested-ternary": `error`,
}

export default eslintRules
