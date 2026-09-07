/**
 * @file Use `let` declarations to bind names to values
 * @author Charles Lowell
 */

import type { NodeOf, Rule } from "../types.ts"

type Node = NodeOf<`VariableDeclaration`>

/**
 * Check if a node is within an ambient context (inside a `declare` module declaration).
 *
 * Walks up the parent chain to determine if the node is inside a TypeScript module declaration that has the `declare` flag set to true.
 *
 * @param node - The AST node to check.
 * @returns True if the node is inside an ambient context, false otherwise.
 */
function isInAmbientContext (node: Node): boolean {
	let current: Node[`parent`] | null = node.parent
	while (current) {
		if (current.type === `TSModuleDeclaration` && current.declare) return true

		current = current.parent
	}
	return false
}

const rule: Rule = {
	meta: {
		type: `suggestion`,
		docs: {
			description: `Use "let" declarations to bind names to values`,
		},
		fixable: `code`,
		schema: [],
	},

	/**
	 * Create rule listeners enforcing "let" over "var" and disallowing "const" outside top-level scope.
	 *
	 * - Reports any `var` declaration (except when inside an ambient `declare` TS module) and suggests using `let`.
	 * - Reports any `const` declaration that is not in a top-level scope (global, module, or Program) and provides a fixer
	 *   that replaces the `const` token with `let`.
	 *
	 * The rule keeps no per-file state, so `createOnce` needs no `before`/`after` hooks;
	 * `context.sourceCode` is read inside the visitors, where it refers to the current file.
	 *
	 * @param context - Rule context.
	 * @returns AST node visitors.
	 */
	createOnce (context) {
		function isTopLevelScope (node: Node): boolean {
			let scope = context.sourceCode.getScope(node)

			return scope.type === `global`
				|| scope.type === `module`
				|| scope.block.type === `Program`
		}

		return {
			VariableDeclaration (node) {
				if (node.kind === `var`) {
					if (isInAmbientContext(node)) return

					context.report({
						message: `prefer "let" over "var" to declare value bindings`,
						node,
					})
				}
				else if (node.kind === `const` && !isTopLevelScope(node)) {
					let constToken = context.sourceCode.getFirstToken(node)

					if (!constToken) return

					context.report({
						message: `"const" declaration outside top-level scope`,
						node,
						fix (fixer) {
							return fixer.replaceText(constToken, `let`)
						},
					})
				}
			},
		}
	},
}

export default rule
