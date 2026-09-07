import { RuleTester } from "oxlint/plugins-dev"
import { describe, it } from "vitest"

import rule from "./index.ts"

RuleTester.describe = describe
RuleTester.it = it

let ruleTester = new RuleTester({
	languageOptions: {
		sourceType: `module`,
	},
})

let sourceMessage = `Use double quotes for import/export source.`
let keyMessage = `Use double quotes for quoted object keys.`

ruleTester.run(`no-single-quotes-in-imports-and-object-keys`, rule, {
	valid: [
		`import a from "mod"`,
		`export { a } from "mod"`,
		`export * from "mod"`,
		`export const a = 1`,
		`let o = { "a": 1, "b-c": 2 }`,
		`let o = { a: 1, [\`b\`]: 2 }`,
		`let s = 'not a key'`,
		`let o = { a: 'value' }`,
	],
	invalid: [
		{
			code: `import a from 'mod'`,
			output: `import a from "mod"`,
			errors: [{ message: sourceMessage }],
		},
		{
			code: `export { a } from 'mod'`,
			output: `export { a } from "mod"`,
			errors: [{ message: sourceMessage }],
		},
		{
			code: `export * from 'mod'`,
			output: `export * from "mod"`,
			errors: [{ message: sourceMessage }],
		},
		{
			code: `import a from 'say "hi"'`,
			output: `import a from "say \\"hi\\""`,
			errors: [{ message: sourceMessage }],
		},
		{
			code: `let o = { 'a': 1, 'b-c': 2 }`,
			output: `let o = { "a": 1, "b-c": 2 }`,
			errors: [{ message: keyMessage }, { message: keyMessage }],
		},
		{
			code: `let o = { 'a': 1, "b": 2 }`,
			output: `let o = { "a": 1, "b": 2 }`,
			errors: [{ message: keyMessage }],
		},
		{
			code: `let o = { 'say "hi"': 1 }`,
			output: `let o = { "say \\"hi\\"": 1 }`,
			errors: [{ message: keyMessage }],
		},
	],
})
