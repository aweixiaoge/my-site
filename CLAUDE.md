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



# Cross-Project Collaboration — Sanity ↔ Next.js

## Repos

- **sanity-studio/** — owns schema, content modeling, GROQ queries (source of truth for data shape).
- **nextjs-app/** — owns rendering, SEO, forms, UI (consumer of Sanity data).

## Core Principle

Sanity defines the contract. Next.js depends on it.
A schema change is a **breaking change** until proven otherwise.
Never change a field name, type, or structure without flagging it.

## Who Owns What

| Concern                           | Owner                                |
| --------------------------------- | ------------------------------------ |
| Field names, types, validation    | Sanity                               |
| GROQ query shape                  | Sanity (defined), Next.js (consumed) |
| SEO metadata rendering            | Next.js                              |
| Multi-language document structure | Sanity                               |
| hreflang / canonical output       | Next.js                              |
| Inquiry form submission logic     | Next.js (writes to Sanity)           |
| Inquiry document schema           | Sanity                               |
| Product page layout               | Next.js                              |

## Change Workflow

### When changing a schema field (Sanity side)

1. Determine if the change is breaking:
   - Renaming a field → **breaking**
   - Changing a field type → **breaking**
   - Removing a field → **breaking**
   - Adding an optional field → **non-breaking**
   - Adding a required field → **breaking** (existing docs lack it)
2. If breaking, do NOT merge until the Next.js side is updated.
3. Communicate the change:
   - Field name (old → new)
   - Type (old → new)
   - Required or optional
   - Migration needed for existing documents?
4. Update GROQ queries in Sanity repo.
5. Notify Next.js repo owner (or create a task).

### When consuming a field (Next.js side)

1. Confirm the field exists in the Sanity schema.
2. Check if it's required or optional; handle missing data gracefully.
3. For multi-language fields, always define a fallback.
4. Write failing test for the new field's rendering BEFORE implementing.
5. Never assume field shape; derive types from the Sanity schema where possible.

## Shared Conventions

### Field Naming

- Both sides use the exact same field names in code.
- No aliasing in GROQ unless there's a documented reason.
- If a field is renamed, both repos update in the same release window.

### Multi-language

- Sanity stores each language as a separate document (via `@sanity/document-internationalization`).
- Next.js derives hreflang and canonical from the document's language metadata.
- Fallback order: current language → English → empty state (never crash).

### GROQ Queries

- Queries that both sides need live in Sanity repo under `lib/queries.ts`.
- Next.js imports or copies them; never writes its own divergent version.
- If Next.js needs a new projection, request it from Sanity side first.

### Inquiry Form

- Schema: Sanity owns `inquiry` document type.
- Submission: Next.js owns the API route / Server Action.
- Write token: stored only in Next.js server env, never in Sanity schema files.
- Sanity Studio shows inquiries via Structure Builder menu item.

## Sync Checklist (before merging a schema change)

- [ ] Breaking change identified and labeled.
- [ ] GROQ queries updated in Sanity repo.
- [ ] Next.js repo notified (task created or PR linked).
- [ ] Next.js types/queries updated to match.
- [ ] Tests pass on both sides.
- [ ] Fallback behavior verified for missing/optional fields.
- [ ] If field renamed: old field removed only after Next.js stops using it.

## Never

- Merge a breaking schema change without updating Next.js.
- Let Next.js define its own version of a GROQ query that diverges from Sanity's.
- Store Sanity write tokens in the Sanity repo.
- Assume a field is present; always handle `null` / `undefined`.
- Rename a field in Sanity without a migration plan for existing documents.

## Communication

- Breaking changes: open an issue in both repos and link them.
- Non-breaking additions: note in the Sanity PR description.
- If unsure whether a change is breaking: treat it as breaking.
