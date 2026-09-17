import { defineConfig, type OxlintConfig } from "oxlint"

/** Rules of oxlint's built-in (Rust) plugins. */
const syntactic: OxlintConfig = defineConfig({
	plugins: [
		`eslint`,
		`import`,
		`jsdoc`,
		`oxc`,
		`promise`,
		`typescript`,
		`unicorn`,
	],
	categories: {
		correctness: `error`,
		pedantic: `error`,
		restriction: `error`,
		suspicious: `error`,
		perf: `error`,
		nursery: `error`,
	},
	rules: {
		"max-lines": [
			`error`,
			{
				skipComments: true,
				skipBlankLines: true,
			},
		],
		"max-lines-per-function": [
			`error`,
			{
				max: 100,
				skipComments: true,
				skipBlankLines: true,
			},
		],
		"no-console": [
			`error`,
			{
				allow: [
					`error`,
					`info`,
					`warn`,
				],
			},
		],
		// Off for good: `eqeqeq` and `no-eq-null` are both on, so `value == null` is refused twice over, while this rule refuses `value === undefined`. Between the three there is no spelling left for the question the plugin asks throughout, `typeof value === "undefined"` aside, and the handful of places that answer a question with `? … : undefined` say what they mean by it.
		"no-undefined": `off`,
		"no-use-before-define": [
			`error`,
			{
				functions: false,
			},
		],
		"import/exports-last": `off`,
		"import/max-dependencies": `off`,
		"import/no-relative-parent-imports": `off`,
		"import/no-default-export": `off`,
		"oxc/no-async-await": `off`,
		"oxc/no-optional-chaining": `off`,
		"oxc/no-rest-spread-properties": `off`,
	},
	overrides: [
		{
			files: [`**/*.{ts,mts,cts,tsx}`],
			rules: {
				"jsdoc/require-param-type": `off`,
				"jsdoc/require-returns-type": `off`,
			},
		},
		{
			files: [`**/*.d.ts`],
			rules: {
				"import/unambiguous": `off`,
			},
		},
		{
			files: [
				`test/**/*.{js,ts}`,
				`**/*.{spec,test}.{js,ts}`,
			],
			rules: {
				"max-lines": `off`,
				"max-lines-per-function": `off`,
			},
		},
	],
})

export default syntactic
