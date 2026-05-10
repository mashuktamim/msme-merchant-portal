# Routing & Modular Structure Rules

All features in the Merchant Portal must follow the **Modular Route-Local** pattern using TanStack Router.

## 1. Route Groups

- Use route groups (parentheses) to categorize features (e.g., `(posts)`, `(auth)`).
- Every feature must reside within a route group to keep the root `/routes` folder clean.

## 2. Modular Route Folders

Within each route directory (e.g., `src/routes/(posts)/posts`), organize code into specialized sub-directories prefixed with a hyphen `-`. This signals they are local to that route.

Required sub-folders:

- `-api/`: Axios request functions.
- `-components/`: React components specific to this route.
- `-hooks/`: Custom hooks (queries, mutations) for this route.
- `-types/`: TypeScript interfaces and Zod schemas.
- `-utils/`: Helper functions, constants, query keys, and query options.

## 3. Barrel Files

- Every sub-folder (`-api`, `-hooks`, etc.) **must** have an `index.ts` file.
- This file should export all public members of the folder for clean imports.
- **Import Pattern**: Prefer importing from the sub-folder index (e.g., `import { usePost } from '../-hooks'`) rather than deep paths.

## 4. Route File Structure

- Use `createFileRoute` from `@tanstack/react-router`.
- Implement `loader` for data prefetching.
- Define `pendingComponent` and `errorComponent` for every main route.
- Keep the `component` function (the page component) in the same file or a specific component if it grows too large.

### Example Structure

```text
src/routes/(posts)/posts/
├── index.tsx          # Route definition & Page component
├── $postId.tsx        # Detail route
├── -api/
│   └── index.ts       # Axios calls
├── -components/
│   ├── PostList.tsx
│   └── PostForm.tsx
├── -hooks/
│   ├── index.ts       # Exports all hooks
│   └── useCreatePost.ts
├── -types/
│   └── index.ts       # Zod schemas & types
└── -utils/
    ├── index.ts       # Exports keys & options
    ├── query-keys.ts
    └── query-options.ts
```
