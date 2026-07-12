<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com), and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]

### Added

- The `no-console` rule now allows the use of the `error`, `info`, and `warn` methods.

## [0.4.0] — 2026–07–01

### Added

- **Breaking changes:**
	- The configuration now requires `oxlint` version `1.72.0` or higher.
	- The following rules has been added:
		- `default-case-last`,
		- `default-param-last`,
		- `grouped-accessor-pairs`,
		- `object-shorthand`,
		- `import/exports-last`,
		- `import/first`,
		- `import/newline-after-import`.

## [0.3.1] — 2026–03–18

### Fixed

- The dependencies have now been updated to versions that include security fixes.

## [0.3.0] — 2026–03–03

### Added

- **Breaking changes:**
	- The configuration now requires `oxlint` version `1.51.0` or higher, which means that you can now enable the `typeAware` and `typeCheck` options in your config.

## [0.1.3] — 2026–02–24

### Fixed

- Functions can now be called before they are declared.
- For files in the `test/` directory and files with the suffixes `.test` or `.spec` before the extension, the following rules are now disabled:
	- `max-lines`,
	- `max-lines-per-function`.

## [0.1.2] — 2026–02–15

### Fixed

- The following rules are now disabled:
	- `import/max-dependencies`,
	- `import/no-relative-parent-imports`,
	- `import/no-default-export`,
	- `oxc/no-async-await`,
	- `oxc/no-optional-chaining`,
	- `oxc/no-rest-spread-properties`.

## [0.1.1] — 2026–02–13

### Fixed

- JS plugin connections are no longer broken.

## [0.1.0] — 2026–02–13

### Added

- Initial config for `oxlint`.

[Unreleased]: https://github.com/firefoxic/oxlint-config/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/firefoxic/oxlint-config/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/firefoxic/oxlint-config/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/firefoxic/oxlint-config/compare/v0.1.3...v0.3.0
[0.1.3]: https://github.com/firefoxic/oxlint-config/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/firefoxic/oxlint-config/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/firefoxic/oxlint-config/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/firefoxic/oxlint-config/compare/v0.0.1...v0.1.0
