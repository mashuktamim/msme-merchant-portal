# General Project Rules & Design System

The Merchant Portal is built with a focus on modern aesthetics, type-safety, and developer experience.

## 1. Styling & Design

- **Framework**: Tailwind CSS v4.
- **Color System**: Uses OKLCH color space for better perceptual uniformity.
- **Theme**: Supports Light and Dark modes via the `.dark` class.
- **Typography**: Uses 'Geist Variable' as the primary sans-serif font.
- **UI Components**: Primarily based on a customized shadcn/ui implementation.

## 2. Coding Standards

- **TypeScript**: Use strict typing. Avoid `any`.
- **Imports**: Use the `@/` alias for absolute imports from the `src` directory.
- **Naming**:
  - Components: PascalCase (e.g., `PostForm.tsx`).
  - Hooks: camelCase starting with `use` (e.g., `usePosts.ts`).
  - Folders: kebab-case.
  - Route-local folders: prefixed with `-` (e.g., `-api`).

## 3. Tech Stack

- **Framework**: React + Vite.
- **Routing**: TanStack Router.
- **State Management**: TanStack Query (Server), Zustand (Client - if needed).
- **Forms**: TanStack Form.
- **API Client**: Axios with a centralized client in `@/api/axios-client`.

## 4. Documentation

- When creating new features, document the data flow and component hierarchy in the feature's route folder if necessary.
- Follow the patterns established in `src/routes/(posts)/posts` as the gold standard.
