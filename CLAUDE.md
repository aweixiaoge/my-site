@AGENTS.md

# Next.js Project — CLAUDE.md

## Project Overview
B2B product showcase site. Frontend built with Next.js App Router.
Content sourced from Sanity via API. Multi-language (EN primary).

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Sanity (headless CMS, separate repo)
- Jest + React Testing Library
- Playwright (E2E)
- pnpm (package manager)

## Directory Conventions
- `app/` — routes, layouts, pages
- `components/` — reusable UI components
- `lib/` — utilities, helpers
- `sanity/` — Sanity client, queries, types
- `__tests__/` or `*.test.ts(x)` — unit tests
- `e2e/` — Playwright tests

## SEO Conventions

### Metadata
- Every public page MUST export `generateMetadata`.
- Metadata fields priority: Sanity `seo` object > product/page fields > hardcoded fallback.
- Never leave `title` or `description` empty. Always provide a fallback.
- Open Graph images should come from Sanity when available.

### Sitemap & Robots
- `app/sitemap.ts` — dynamically generated from Sanity slugs.
- `app/robots.ts` — disallow `/studio` and `/api/`, point to sitemap.
- Never hardcode sitemap entries; always fetch from Sanity.

### Structured Data (JSON-LD)
- Product detail pages MUST inject `Product` schema JSON-LD.
- Use `dangerouslySetInnerHTML` with `JSON.stringify`, not template strings.
- Data must come from Sanity, not hardcoded.

### Multi-language SEO
- Use `alternates.languages` in `generateMetadata` for hreflang.
- `canonical` must point to the current language's URL.
- Every language version must have its own unique `title` and `description`.

### What NOT to Do
- Do not inline GROQ queries in metadata functions; use `sanity/queries`.
- Do not skip `generateMetadata` on product or listing pages.
- Do not use client components for metadata generation.

## Testing Conventions

### TDD Workflow (strict)
1. ALWAYS write a FAILING test BEFORE implementation.
2. Run the test and show the failing assertion.
3. Only then write minimal implementation to pass.
4. Run tests again. If green, stop unless refactor is needed.
5. After refactor, run tests again to confirm still green.

### Test Rules
- Use AAA pattern: Arrange-Act-Assert.
- Test names describe behavior, not implementation.
  - Good: `should_return_empty_array_when_no_products`
  - Bad: `test_getProducts_returns_empty`
- Never mock Sanity's client directly in component tests; mock the data-fetching function instead.
- E2E tests cover critical flows only: product listing, product detail, inquiry form submission.

### What to Test
- Data-fetching functions in `sanity/` — pure logic, easy to test.
- UI components — render output and user interactions.
- Form validation logic — especially inquiry form.
- Edge cases: empty data, missing fields, API errors, multi-language fallback.
- `generateMetadata` output — title, description, alternates.

### What NOT to Test
- Sanity Studio internals (separate repo).
- Third-party library behavior.
- Implementation details like internal state names.

## Coding Conventions
- Prefer Server Components unless client interactivity is needed.
- All Sanity queries go through functions in `sanity/`, never inline GROQ in components.
- Types: derive from Sanity schema where possible; avoid `any`.
- Environment variables: server-only secrets never prefixed with `NEXT_PUBLIC_`.
- Use `pnpm` for all package operations. Never use `npm` or `yarn`.
- Never commit `package-lock.json` or `yarn.lock`; only `pnpm-lock.yaml`.

## Commands
- `pnpm dev` — start dev server
- `pnpm test` — run Jest tests
- `pnpm test:watch` — Jest in watch mode
- `pnpm test:e2e` — Playwright
- `pnpm lint` — ESLint
- `pnpm typecheck` — tsc --noEmit
- `pnpm add <pkg>` — add dependency
- `pnpm add -D <pkg>` — add dev dependency

## When Working on a Feature
1. Clarify acceptance criteria if ambiguous.
2. Write failing test(s) first.
3. Run test, confirm failure.
4. Implement minimal code.
5. Run test, confirm pass.
6. Run full test suite + typecheck + lint.
7. Only then consider refactor.

## Never
- Write implementation before tests.
- Skip running tests after changes.
- Inline GROQ queries in components.
- Expose Sanity write tokens to the client.
- Use `any` without justification.
- Skip `generateMetadata` on public pages.
- Hardcode SEO values that should come from Sanity.
- Use `npm` or `yarn` commands in this project.

@../COLLABORATION.md
