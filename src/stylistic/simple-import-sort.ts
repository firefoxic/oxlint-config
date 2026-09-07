import type { OxlintConfig } from "oxlint"

/** Rules of `eslint-plugin-simple-import-sort`. */
const simpleImportSortRules: NonNullable<OxlintConfig[`rules`]> = {
	"simple-import-sort/exports": `error`,
	"simple-import-sort/imports": [
		`error`,
		{
			groups: [
				// 1.Node.js modules
				[`^node:`],
				// 2. Foreign modules
				[`^@?\\w`],
				// 3. Styles
				[`^.+\\.s?css$`],
				// 4. Absolute imports (@/...)
				[`^@/`],
				// 5. Relative imports (up)
				[
					`^\\.\\.(?!/?$)`,
					`^\\.\\./?$`,
				],
				// 6. Relative imports (down)
				[
					`^\\./(?=.*/)(?!/?$)`,
					`^\\.(?!/?$)`,
					`^\\./?$`,
				],
			],
		},
	],
}

export default simpleImportSortRules
