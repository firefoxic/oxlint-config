# Repository Guidelines

## Project Structure & Module Organization

This package publishes an oxlint configuration. TypeScript source lives in `src/`; the main exports are `index.ts`, `syntactic.ts`, and `stylistic.ts`. Custom lint rules are under `src/plugins/enough-is-enough/`. Tests are in `tests/` and alongside source modules as `*.test.ts`. `fixtures/ts-config/` contains sample files used by type-checking tests, and `scripts/` contains build helpers. Generated package files go to `dist/`; do not edit them by hand.

## Build, Test, and Development Commands

Use pnpm with a supported Node.js LTS release (see `package.json` engines).

- `make build` compiles the package and generates declaration files in `dist/`.
- `make test` builds first, then runs the Vitest suite.
- `make lint` checks the repository with oxlint; `make fix` applies its fixes.
- `make typecheck` runs `tsrs` for TypeScript checks.
- `make verify` runs lint, type-checking, and tests, matching the CI checks.

Install dependencies with `pnpm install`. Use `make help` to list available targets.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF endings, tabs for indentation, and a final newline. The codebase uses TypeScript ES modules and double quotes. Name tests `*.test.ts`; keep rule implementations and their supporting files together under the relevant plugin directory. Run `make fix` for supported automatic formatting and lint fixes, then `make lint` to review the result.

## Testing Guidelines

Vitest discovers `src/**/*.test.ts` and `tests/**/*.test.ts`. Add or update tests with each behavior change, especially when changing exported configuration or custom rule behavior. Run `make test` locally; run `make verify` before submitting changes.

## Commit & Pull Request Guidelines

Recent commits use short imperative subjects, such as `Upgrade ...`, `Disable ...`, and `Replace ...`; release commits may use a version alone. Keep each commit focused and describe the change directly. Pull requests should explain the user-visible or configuration impact, link a related issue when applicable, and report the checks run. Include examples when a rule's behavior changes.

## Scratch Files

Keep temporary plans, scripts, and captured output in the root `tmp/` directory. It is ignored by Git; do not commit its contents.
