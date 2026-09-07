SHELL := bash
.SHELLFLAGS := -euo pipefail -c
.ONESHELL:

export PATH := $(CURDIR)/node_modules/.bin:$(PATH)

ANSI_RESET := \033[0m
ANSI_BOLD := \033[1m
ANSI_BOLD_CYAN := \033[1;36m

help: ## 🧾 Print this message
	$(call print_help)
.PHONY: help

lint: ## 🧬 Check code by eslint
	oxlint
.PHONY: lint

fix: ## 🩹 Fix code by eslint
	oxlint --fix
.PHONY: fix

test: ## 🧪 Run tests
	vitest
.PHONY: test

verify: lint test ## ✅ Run every check the CI runs
.PHONY: verify

release: verify ## 🚀 Release a new version
	pnpm dlx @firefoxic/release-it
.PHONY: release

define print_help
	@printf "\n\t📜 $(ANSI_BOLD)Available targets:$(ANSI_RESET)\n\n"
	grep -E '^[a-zA-Z0-9_-]+:.*?## ' $(MAKEFILE_LIST) \
	| awk -F ':|##' '\
	BEGIN { \
		ANSI_BOLD_CYAN = "$(ANSI_BOLD_CYAN)"; \
		ANSI_RESET = "$(ANSI_RESET)"; \
	} \
	{ \
		targets[NR]=$$1; descs[NR]=$$3; \
		if (length($$1) > max) max = length($$1); \
	} \
	END { \
		for (i = 1; i <= NR; i++) { \
			printf "\t%s%" max "s%s —%s\n", ANSI_BOLD_CYAN, targets[i], ANSI_RESET, descs[i]; \
		} \
		printf "\n" \
	}'
endef
