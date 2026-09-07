import type { OxlintConfig } from "oxlint"

/** Rules of `@stylistic/eslint-plugin`. */
const stylisticRules: NonNullable<OxlintConfig[`rules`]> = {
	"@stylistic/array-bracket-newline": `error`,
	"@stylistic/array-bracket-spacing": `error`,
	"@stylistic/array-element-newline": [
		`error`,
		{
			consistent: true,
			multiline: true,
		},
	],
	"@stylistic/arrow-parens": `error`,
	"@stylistic/arrow-spacing": `error`,
	"@stylistic/block-spacing": `error`,
	"@stylistic/brace-style": [
		`error`,
		`stroustrup`,
		{
			allowSingleLine: true,
		},
	],
	"@stylistic/comma-dangle": [
		`error`,
		`always-multiline`,
	],
	"@stylistic/comma-spacing": `error`,
	"@stylistic/comma-style": `error`,
	"@stylistic/computed-property-spacing": `error`,
	"@stylistic/curly-newline": [
		`error`,
		{
			consistent: true,
			multiline: true,
		},
	],
	"@stylistic/dot-location": [
		`error`,
		`property`,
	],
	"@stylistic/eol-last": `error`,
	"@stylistic/function-call-argument-newline": [
		`error`,
		`consistent`,
	],
	"@stylistic/function-call-spacing": `error`,
	"@stylistic/function-paren-newline": [
		`error`,
		`multiline-arguments`,
	],
	"@stylistic/generator-star-spacing": [
		`error`,
		`after`,
	],
	"@stylistic/implicit-arrow-linebreak": `error`,
	"@stylistic/indent": [
		`error`,
		`tab`,
		{
			SwitchCase: 1,
		},
	],
	"@stylistic/indent-binary-ops": [
		`error`,
		`tab`,
	],
	"@stylistic/key-spacing": `error`,
	"@stylistic/keyword-spacing": `error`,
	"@stylistic/linebreak-style": `error`,
	"@stylistic/lines-around-comment": [
		`error`,
		{
			beforeBlockComment: true,
			allowBlockStart: true,
		},
	],
	"@stylistic/lines-between-class-members": `error`,
	"@stylistic/member-delimiter-style": [
		`error`,
		{
			multiline: {
				delimiter: `comma`,
				requireLast: true,
			},
			singleline: {
				delimiter: `comma`,
				requireLast: false,
			},
		},
	],
	"@stylistic/multiline-comment-style": [
		`error`,
		`separate-lines`,
	],
	"@stylistic/multiline-ternary": [
		`error`,
		`always-multiline`,
	],
	"@stylistic/new-parens": `error`,
	"@stylistic/no-confusing-arrow": `off`,
	"@stylistic/no-extra-semi": `error`,
	"@stylistic/no-floating-decimal": `error`,
	"@stylistic/no-mixed-operators": `error`,
	"@stylistic/no-mixed-spaces-and-tabs": `error`,
	"@stylistic/no-multi-spaces": `error`,
	"@stylistic/no-multiple-empty-lines": [
		`error`,
		{
			max: 1,
			maxBOF: 0,
			maxEOF: 0,
		},
	],
	"@stylistic/no-trailing-spaces": `error`,
	"@stylistic/no-whitespace-before-property": `error`,
	"@stylistic/nonblock-statement-body-position": `error`,
	"@stylistic/object-curly-newline": [
		`error`,
		{
			consistent: true,
			multiline: true,
		},
	],
	"@stylistic/object-curly-spacing": [
		`error`,
		`always`,
	],
	"@stylistic/object-property-newline": [
		`error`,
		{
			allowAllPropertiesOnSameLine: true,
		},
	],
	"@stylistic/one-var-declaration-per-line": `error`,
	"@stylistic/operator-linebreak": [
		`error`,
		`before`,
		{
			overrides: {
				"=": `none`,
			},
		},
	],
	"@stylistic/padded-blocks": [
		`error`,
		`never`,
	],
	"@stylistic/padding-line-between-statements": [
		`error`,
		{
			blankLine: `always`,
			prev: `*`,
			next: [
				`class`,
				`function`,
				`export`,
				`import`,
			],
		},
		{
			blankLine: `always`,
			prev: [
				`class`,
				`function`,
				`export`,
				`import`,
			],
			next: `*`,
		},
		{
			blankLine: `any`,
			prev: [
				`const`,
				`let`,
				`var`,
			],
			next: [
				`const`,
				`let`,
				`var`,
			],
		},
		{
			blankLine: `any`,
			prev: `export`,
			next: `export`,
		},
		{
			blankLine: `any`,
			prev: `import`,
			next: `import`,
		},
		{
			blankLine: `any`,
			prev: `*`,
			next: `return`,
		},
	],
	"@stylistic/quote-props": [
		`error`,
		`consistent-as-needed`,
		{
			keywords: true,
		},
	],
	"@stylistic/quotes": [
		`error`,
		`backtick`,
	],
	"@stylistic/rest-spread-spacing": `error`,
	"@stylistic/semi": [
		`error`,
		`never`,
		{
			beforeStatementContinuationChars: `always`,
		},
	],
	"@stylistic/semi-spacing": [
		`error`,
		{
			before: false,
			after: true,
		},
	],
	"@stylistic/semi-style": [
		`error`,
		`first`,
	],
	"@stylistic/space-before-blocks": `error`,
	"@stylistic/space-before-function-paren": `error`,
	"@stylistic/space-in-parens": `error`,
	"@stylistic/space-infix-ops": `error`,
	"@stylistic/space-unary-ops": `error`,
	"@stylistic/spaced-comment": `error`,
	"@stylistic/switch-colon-spacing": `error`,
	"@stylistic/template-curly-spacing": `error`,
	"@stylistic/template-tag-spacing": `error`,
	"@stylistic/type-annotation-spacing": `error`,
	"@stylistic/type-generic-spacing": `error`,
	"@stylistic/type-named-tuple-spacing": `error`,
	"@stylistic/wrap-iife": `error`,
	"@stylistic/wrap-regex": `error`,
	"@stylistic/yield-star-spacing": `error`,
}

export default stylisticRules
