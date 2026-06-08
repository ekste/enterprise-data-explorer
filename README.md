# Enterprise Data Explorer

A React + TypeScript portfolio project demonstrating reusable enterprise UI patterns for data-heavy applications.

This is not intended to be a CRUD tutorial app. The goal is to show how a senior front-end developer might approach common enterprise SaaS interface problems: reusable table architecture, filtering, sorting, persisted UI state, detail panels, routing, testing, and virtualised rendering for large datasets.

## Features

* React + TypeScript application built with Vite
* Global routing with React Router
* Reusable generic data table
* Search and status filtering
* Sortable columns
* Row selection
* Customer detail panel
* Persisted UI state with localStorage
* Light/dark theme persistence
* Virtualised table implementation for large datasets
* Vitest and React Testing Library setup

## Architecture decisions

### Generic table model

The standard customer table is rendered through a reusable `DataTable` component.

Customer-specific behaviour lives outside the table in the page-level column configuration. This keeps the table reusable while still allowing each feature area to define its own data shape and display rules.

### Separate virtualised table implementation

The project deliberately uses a separate `VirtualisedDataTable` rather than adding a `virtualised` prop to `DataTable`.

Virtualisation is a different rendering strategy, not a minor display variant. Keeping the implementations separate makes the trade-offs clearer and avoids hiding complex behaviour behind a boolean prop.

### Component colocation

Components are organised with their TypeScript, CSS, and tests colocated where practical.

Example structure:

```
CustomerDetail/
├─ CustomerDetail.tsx
├─ CustomerDetail.css
└─ CustomerDetail.test.tsx
```

This keeps feature ownership clear and makes the project easier to navigate.

## Current trade-offs

The virtualised table currently uses an internal fixed-height scroll container. This keeps the implementation simple and reliable.

A future enterprise-grade enhancement would be to investigate page-level virtualisation, where the table virtualises against the document scroll rather than a nested viewport.

That has UX benefits, but also introduces more complexity around layout, sticky headers, scroll restoration, and browser behaviour.

## Testing

Tests use Vitest and React Testing Library.

The testing direction is to prefer user-facing behaviour, roles, labels, and meaningful interactions over brittle assertions against specific fixture text.

## Tech stack

* React
* TypeScript
* Vite
* React Router
* Vitest
* React Testing Library
* TanStack React Virtual

## Running locally

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

## Validate

Run linting:

```
npm run lint
```

Run tests:

```
npm run test
```

Run a production build:

```
npm run build
```

## Future improvements

* Improve the detail panel into a fully accessible drawer
* Add stronger keyboard support to the virtualised table
* Expand reusable table tests
* Investigate page-level virtualisation
* Add empty, loading, and error-state patterns
