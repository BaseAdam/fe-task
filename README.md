# Product catalogue

A product list with pagination stored in the URL and a
three-step add-product form in a dialog, built to match the Figma design.

**Demo:** https://fe-task-gules.vercel.app/

## Requirements

Node.js **22.12** or newer. The floor comes from Vitest (`^22.12 || ^24 || >=26`) - Vite
alone would settle for 20.19, but the test suite will not run on it. Verified on 22.22.0,
npm 10.9.4.

## Running the app

```bash
npm install
npm run dev
```

The app starts on `http://localhost:5173`. If that port is taken, Vite picks the next free
one and prints the address in the terminal.

## Tests

```bash
npm run test:run      # single run, the way CI would do it
npm test              # watch mode, reruns on every change
```

15 tests across three files:

| file | covers                                                                    |
|---|---------------------------------------------------------------------------|
| `src/utils/pagination.test.ts` | page count, clamping an out-of-range page, the number range with ellipses |
| `src/utils/price.test.ts` | amount validation, net ↔ gross conversion, rounding to whole cents        |
| `tests/addProduct.integration.test.tsx` | integration - the full three-step form flow through to the table row      |

Unit tests sit next to the files they cover; the integration test lives in `tests/`.

## Other commands

```bash
npm run build         # tsc -b && vite build, output in dist/
npm run preview       # serve the production build locally
npm run typecheck     # tsc -b, covers the tests/ folder too
npm run lint          # eslint
npm run format        # prettier
```

## Stack

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · shadcn/ui (Radix)
TanStack Form · Zod 4 · nuqs · sonner · Vitest 5 · Testing Library

## Layout

```
src/
  components/ui/      shadcn/ui primitives
  components/form/    form fields wired to TanStack Form
  features/products/  list, table, mobile cards, pagination
    addProduct/       dialog and the three form steps
  hooks/              useAppForm, useFieldControl, useProducts, useStepFlow
  types/              Zod schemas and domain types
  utils/              formatting, prices, pagination
  mock/               catalogue seed data
tests/                integration test and test environment setup
```

## How it works

**Pagination in the URL.** `nuqs` keeps the page number in the query string, so the address
is shareable and survives a reload. A number outside the valid range is clamped to an
existing page.

**Three-step form.** One form state spans all steps, and each step validates its own field
group against its own Zod schema. "Next" only goes through on valid data. Nothing reaches
the catalogue until the final step is saved.

**Prices.** Net and gross derive from each other through the VAT rate. The form holds amounts
as strings; conversion to numbers happens on save.

**Persistence.** Products live in `localStorage` and are parsed through a Zod schema on read -
a corrupted entry falls back to the seed data instead of breaking the app.

**Mobile view.** Below the `md` breakpoint the table gives way to cards, because six columns
cannot be laid out readably on a phone.
