import type { OxlintConfig } from "oxlint"

/** Import and export sorting rules of `eslint-plugin-perfectionist`. */
const perfectionistRules: NonNullable<OxlintConfig[`rules`]> = {
	"perfectionist/sort-exports": [
		`error`,
		{
			type: `natural`,
		},
	],
	"perfectionist/sort-imports": [
		`error`,
		{
			type: `natural`,
			sortBy: `path`,
			newlinesBetween: 1,
			newlinesInside: 0,
			customGroups: [
				{
					groupName: `node`,
					selector: `import`,
					elementNamePattern: `^node:`,
				},
				{
					groupName: `packages`,
					selector: `import`,
					elementNamePattern: `^@?\\w`,
				},
				{
					groupName: `styles`,
					selector: `import`,
					elementNamePattern: `^.+\\.s?css$`,
				},
				{
					groupName: `absolute`,
					selector: `import`,
					elementNamePattern: `^@/`,
				},
				{
					groupName: `parent`,
					selector: `import`,
					elementNamePattern: `^\\.\\.(?!/?$)`,
				},
				{
					groupName: `parent`,
					selector: `import`,
					elementNamePattern: `^\\.\\./?$`,
				},
				{
					groupName: `relative-nested`,
					selector: `import`,
					elementNamePattern: `^\\./(?=.*/)(?!/?$)`,
				},
				{
					groupName: `relative-shallow`,
					selector: `import`,
					elementNamePattern: `^\\.(?!/?$)`,
				},
				{
					groupName: `relative-shallow`,
					selector: `import`,
					elementNamePattern: `^\\./?$`,
				},
			],
			groups: [`node`, `packages`, `styles`, `absolute`, `parent`, `relative-nested`, { newlinesBetween: 0 }, `relative-shallow`, `unknown`],
		},
	],
}

export default perfectionistRules
