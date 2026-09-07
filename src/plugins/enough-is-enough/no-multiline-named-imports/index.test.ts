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

ruleTester.run(`no-multiline-named-imports`, rule, {
	valid: [
		`import { a, b } from "mod"`,
		`import a from "mod"`,
		`import * as ns from "mod"`,
		`import a, { b, c } from "mod"`,
		`import "mod"`,
		`import { a as b } from "mod";`,
	],
	invalid: [
		{
			code: `import {\n\ta,\n\tb,\n} from "mod"`,
			output: `import { a, b } from "mod"`,
			errors: [{ messageId: `multiline` }],
		},
		{
			code: `import {\n\ta,\n\tb,\n} from "mod";`,
			output: `import { a, b } from "mod";`,
			errors: [{ messageId: `multiline` }],
		},
		{
			code: `import def, {\n\ta as b,\n} from "mod"`,
			output: `import def, { a as b } from "mod"`,
			errors: [{ messageId: `multiline` }],
		},
		{
			code: `import {\n\ta,\n\tb\n} from 'mod'`,
			output: `import { a, b } from 'mod'`,
			errors: [{ messageId: `multiline` }],
		},
	],
})
