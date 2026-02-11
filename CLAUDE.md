# CLAUDE.md

## Project Overview

X Clean Share — A Chrome extension that removes tracking parameters from X/Twitter share URLs.

**Tech Stack**: TypeScript, [WXT](https://wxt.dev/) (Manifest V3), Vitest, [Biome](https://biomejs.dev/) (linter/formatter)

## Architecture

```
entrypoints/
└── content.ts             # MAIN world content script (clipboard writeText override)
utils/
├── cleaner.ts             # URL cleaning logic (pure functions)
└── cleaner.test.ts        # Unit tests for cleaner
```

- Path alias: `@/` → project root
- WXT global functions (`defineContentScript`, etc.) do not need to be imported

## Development Commands

```bash
mise exec -- pnpm dev        # Start dev server (hot reload)
mise exec -- pnpm build      # Production build
mise exec -- pnpm compile    # Type check (tsc --noEmit)
mise exec -- pnpm lint       # Lint and format check (Biome)
mise exec -- pnpm lint:fix   # Lint and format with auto-fix
mise exec -- pnpm test       # Run tests (Vitest)
mise exec -- pnpm zip        # Create ZIP for Chrome Web Store
```

## Testing Conventions

- **Framework**: Vitest
- **Location**: Place `*.test.ts` in the same directory as the test target
- **Structure**: Group with `describe`, cover normal cases, error cases, and edge cases
- **Scope**: Only test public functions (private methods are out of scope)

## Code Conventions

- TypeScript strict mode
- Prefer arrow functions
- Naming: camelCase (variables/functions), PascalCase (types), kebab-case (CSS classes)
