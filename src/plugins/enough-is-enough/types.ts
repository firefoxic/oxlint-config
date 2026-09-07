import type { RuleTester } from "oxlint/plugins-dev"

export type Rule = Parameters<RuleTester[`run`]>[1]

export type Visitors = ReturnType<NonNullable<Rule[`create`]>>

/** AST node passed to the visitor for the given node type. */
export type NodeOf<K extends keyof Visitors> = Parameters<NonNullable<Visitors[K]>>[0]

export type Plugin = {
	meta: {
		name: string,
	},
	rules: Record<string, Rule>,
}
