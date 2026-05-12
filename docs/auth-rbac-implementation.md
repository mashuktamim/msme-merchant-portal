# Implementation Plan: Authentication & Role-Based Access Control (RBAC)

This document outlines the strategy for implementing a robust authentication flow, RBAC, and a permission-integrated UI for the Merchant Portal, strictly adhering to the project's [Modular Route-Local](file:///Users/mashuktamim/Desktop/bkash-msme-frontend/merchant-portal/docs/rules/routing.md) and [Data Fetching](file:///Users/mashuktamim/Desktop/bkash-msme-frontend/merchant-portal/docs/rules/data-fetching.md) guidelines.

## 1. Objectives

- Implement a secure authentication flow using **TanStack Router**, **TanStack Form**, and **Zustand**.
- Establish a Role-Based Access Control (RBAC) system with granular permissions.
- Integrate permissions directly into the UI (Sidebar, Navbar).
- Follow the established **Modular Route-Local** pattern for all new routes.

---

## 2. Architecture & Patterns

### Auth State Management

- **Store**: `Zustand` with `persist` middleware in `src/store/use-auth-store.ts`.
- **Functionality**: Manage user profile, tokens, and basic role/permission checks.

### Routing & Protection

- **Modular Layouts**: Use a `(auth)` group for authentication pages and a tiered layout structure for protection.
- **Route Guards**: Leverage TanStack Router's `beforeLoad` for robust, type-safe protection.
- **Router Context**: Inject `auth` state into the router context via `src/routes/__root.tsx`.

### Data Fetching

- **User Profile**: Fetch user details using `TanStack Query` with `queryOptions` in `-utils/query-options.ts`.
- **Invalidation**: Clear auth-related queries on logout.

---

## 3. Detailed Implementation Steps

### Phase 1: Foundation (Types & Global State)

1.  **Global Types**:
    - Create `src/types/auth.ts` for `User`, `Role`, and `Permission` interfaces.
2.  **Zustand Store**:
    - Create `src/store/use-auth-store.ts`.
    - Implement `login`, `logout`, and permission helper methods.

### Phase 2: Authentication Routes (The `(auth)` Group)

Following the **Modular Route-Local** pattern:

1.  **Login Route**: `src/routes/(auth)/login/index.tsx`
    - **Form**: Use **TanStack Form** with **Zod** validation.
    - **UI**: Use centralized field components (`Field`, `FieldLabel`, `FieldError`) as per [forms.md](file:///Users/mashuktamim/Desktop/bkash-msme-frontend/merchant-portal/docs/rules/forms.md).
    - **Local Assets**:
      - `-api/`: `login` request function.
      - `-hooks/`: `useLogin` mutation hook (handles toast and redirect).
      - `-types/`: `LoginSchema` and inferred types.
2.  **Unauthorized Route**: `src/routes/(auth)/unauthorized.tsx`

### Phase 3: Route Protection & Layouts

1.  **Protected Root Layout**: `src/routes/_authenticated.tsx`
    - Uses `beforeLoad` to verify authentication.
    - Redirects to `/login` with `redirect` from `@tanstack/react-router`.
2.  **Tiered Protection**:
    - `src/routes/_authenticated/_admin.tsx`: Layout for Admin-only routes (e.g., User Management).
    - `src/routes/_authenticated/_merchant.tsx`: Layout for Merchant-only routes.
3.  **Root Integration**:
    - Update `src/routes/__root.tsx` and `src/router.tsx` to handle `AuthContext`.

### Phase 4: UI Integration (Sidebar & Navbar)

1.  **Dynamic Sidebar**: `src/components/layout/Sidebar.tsx`
    - Permission-aware filtering of navigation items.
2.  **Global Navbar**: `src/components/layout/Navbar.tsx`
    - Breadcrumbs, User Profile, and Theme Toggle.
3.  **PermissionGuard**: `src/components/auth/PermissionGuard.tsx`
    - Reusable wrapper for conditional rendering based on user permissions.

---

## 4. Proposed File Structure

```text
src/
├── types/
│   └── auth.ts                # Global auth types
├── store/
│   └── use-auth-store.ts      # Zustand auth state
├── routes/
│   ├── (auth)/                # Auth feature group
│   │   ├── login/
│   │   │   ├── index.tsx      # Login page component
│   │   │   ├── -api/          # Login API calls
│   │   │   ├── -hooks/        # useLogin mutation
│   │   │   └── -types/        # Login Zod schemas
│   │   └── unauthorized.tsx
│   ├── _authenticated.tsx     # Base protected layout
│   └── _authenticated/
│       ├── _admin.tsx         # Admin role layout
│       └── dashboard.tsx      # Example protected page
└── components/
    ├── auth/
    │   └── PermissionGuard.tsx
    └── layout/
        ├── Sidebar.tsx
        ├── Navbar.tsx
        └── AppLayout.tsx
```

---

## 5. Coding Standards Compliance

- **Route Definitions**: Every main route MUST define `pendingComponent` and `errorComponent`.
- **Data Prefetching**: Use `loader` for prefetching user profile data into `queryClient` if necessary.
- **Styling**: Tailwind v4 with **OKLCH** color system.
- **Strict Typing**: No use of `any`.

## 6. Next Steps

1.  **Finalize Review**: Ensure the user is satisfied with the rule-aligned plan.
2.  **Phase 1 Execution**: Create global types and initialize the Zustand store.
3.  **Phase 2 Execution**: Scaffold the `(auth)` group and implement the login flow.
