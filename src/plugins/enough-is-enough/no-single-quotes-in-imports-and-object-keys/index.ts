import type { NodeOf, Rule } from "../types.ts"

type Literal = NodeOf<`Literal`>
type ObjectExpression = NodeOf<`ObjectExpression`>
type DeclarationWithSource = NodeOf<`ImportDeclaration`> | NodeOf<`ExportNamedDeclaration`> | NodeOf<`ExportAllDeclaration`>

const rule: Rule = {
	meta: {
		type: `suggestion`,
		docs: {
			description: `Disallow single quotes in import/export sources and object keys when quoted`,
		},
		fixable: `code`,
		schema: [],
	},

	create (context) {
		let { sourceCode } = context

		function isSingleQuoted (node: Literal): node is Literal & { value: string } {
			if (typeof node.value !== `string`) return false

			let text = sourceCode.getText(node)

			return text.startsWith(`'`) && text.endsWith(`'`)
		}

		function reportSingleQuoted (literal: Literal & { value: string }, message: string): void {
			context.report({
				node: literal,
				message,
				fix (fixer) {
					return fixer.replaceText(literal, `"${literal.value.replaceAll(`"`, `\\"`)}"`)
				},
			})
		}

		function checkDeclarationSource (node: DeclarationWithSource): void {
			let literal = node.source

			if (!literal || !isSingleQuoted(literal)) return

			reportSingleQuoted(literal, `Use double quotes for import/export source.`)
		}

		function checkObjectExpression (node: ObjectExpression): void {
			for (let prop of node.properties) {
				if (prop.type !== `Property` || prop.key.type !== `Literal`) continue

				let { key } = prop

				if (!isSingleQuoted(key)) continue

				reportSingleQuoted(key, `Use double quotes for quoted object keys.`)
			}
		}

		return {
			ImportDeclaration: checkDeclarationSource,
			ExportNamedDeclaration: checkDeclarationSource,
			ExportAllDeclaration: checkDeclarationSource,
			ObjectExpression: checkObjectExpression,
		}
	},
}

export default rule
