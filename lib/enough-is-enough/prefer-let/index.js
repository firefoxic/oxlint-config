/**
 * @file Use `let` declarations to bind names to values
 * @author Charles Lowell
 */

// oxlint-disable-next-line import/no-default-export
export default {
	meta: {
		docs: {
			description: `Use "let" declarations to bind names to values`,
			category: `Stylistic Issues`,
			recommended: false,
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
	 * The implementation uses the provided context to obtain sourceCode and scope information.
	 *
	 * @param {import("eslint").Rule.RuleContext} context - ESLint rule context.
	 * @returns {Object<string, Function>} An object of AST node visitor functions (notably a `VariableDeclaration` handler).
	 */
	create (context) {
		let sourceCode = context.sourceCode

		function getScope (node) {
			return sourceCode.getScope ? sourceCode.getScope(node) : context.getScope()
		}

		function isTopLevelScope (node) {
			return getScope(node).type === `global`
				|| getScope(node).type === `module`
				|| getScope(node).block.type === `Program`
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
					let constToken = sourceCode.getFirstToken(node)

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

function isInAmbientContext (node) {
	let current = node.parent
	while (current) {
		if (current.type === `TSModuleDeclaration` && current.declare === true) return true

		current = current.parent
	}
	return false
}
