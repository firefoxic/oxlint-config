/**
 * @file Use `let` declarations to bind names to values
 * @author Charles Lowell
 */

import { RuleTester } from "oxlint/plugins-dev"
import { describe, it } from "vitest"

import rule from "./index.js"

RuleTester.describe = describe
RuleTester.it = it

let ruleTester = new RuleTester({
	languageOptions: {
		sourceType: `module`,
	},
})

ruleTester.run(`prefer-let`, rule, {

	valid: [
		{
			code: `const PI = 3.14;`,
		},
		{
			code: `const { foo, bar } = {};`,
		},
		{
			code: `export const AlsoObject = Object;`,
		},
		{
			languageOptions: {
				sourceType: `script`,
			},
			code: `const PI = 3.14;`,
		},
		{
			code: `declare global { var foo: any; }`,
			filename: `file.ts`,
		},
		{
			code: `declare module 'foo' { var bar: any; }`,
			filename: `file.ts`,
		},
		{
			code: `declare namespace MyNamespace { var baz: any; }`,
			filename: `file.ts`,
		},
	],

	invalid: [
		{
			code: `function y() { const x = 'y'; return x; }`,
			output: `function y() { let x = 'y'; return x; }`,
			errors: [
				{
					message: `"const" declaration outside top-level scope`,
				},
			],
		},
		{
			code: `function y() { const {x, y} = {x: 'x', y: 'y'}}`,
			output: `function y() { let {x, y} = {x: 'x', y: 'y'}}`,
			errors: [
				{
					message: `"const" declaration outside top-level scope`,
				},
			],
		},
		{
			code: `var x = 'y';`,
			errors: [
				{
					message: `prefer "let" over "var" to declare value bindings`,
				},
			],
		},
		{
			code: `function y() { var x = 'y'};`,
			errors: [
				{
					message: `prefer "let" over "var" to declare value bindings`,
				},
			],
		},
		{
			code: `function y() { var { x, y } = {}; }`,
			errors: [
				{
					message: `prefer "let" over "var" to declare value bindings`,
				},
			],
		},
		{
			languageOptions: {
				sourceType: `script`,
			},
			code: `function y() { const x = 'y'; return x; }`,
			output: `function y() { let x = 'y'; return x; }`,
			errors: [
				{
					message: `"const" declaration outside top-level scope`,
				},
			],
		},
	],
})
