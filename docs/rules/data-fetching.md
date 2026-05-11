# Data Fetching & State Management Rules

The Merchant Portal uses **TanStack Query (v5)** as the primary data fetching and server-state management library.

## 1. Query Keys Strategy

- Centralize all query keys in `-utils/query-keys.ts` within the respective route.
- Use a structured object for keys to ensure consistency and prevent typos.
- Follow the hierarchy: `all` -> `lists` -> `details`.

```typescript
// Example: src/routes/(posts)/posts/-utils/query-keys.ts
export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (filters: string) => [...postsKeys.lists(), { filters }] as const,
  details: () => [...postsKeys.all, 'detail'] as const,
  detail: (id: number) => [...postsKeys.details(), id] as const,
}
```

## 2. Query Options

- Use `queryOptions` from `@tanstack/react-query` to create reusable query configurations.
- Define these in `-utils/query-options.ts`.
- This allows sharing the same query logic between `loader` and `useQuery`.

```typescript
// Example: src/routes/(posts)/posts/-utils/query-options.ts
export const createPostsQueryOptions = () => {
  return queryOptions({
    queryKey: postsKeys.lists(),
    queryFn: getPosts,
  })
}
```

## 3. Route Loaders (Prefetching)

- Always use `queryClient.fetchQuery` (or `ensureQueryData`) in the route's `loader` function to prefetch data.
- **NEVER return data from the loader**. The loader's purpose is strictly to seed the cache.
- Components should primarily use `useQuery` (passing the same query options) to actually access and react to the data.

```typescript
// Example: src/routes/(posts)/posts/index.tsx
export const Route = createFileRoute('/(posts)/posts/')({
  loader: async ({ context: { queryClient } }) => {
    // Prefetch data into the cache
    await queryClient.fetchQuery(createPostsQueryOptions());
    // Do NOT return anything here
  },
});
```

## 4. Mutations & Invalidation

- Wrap all `useMutation` and `useQuery` calls in custom hooks located in the `-hooks/` directory.
- **CRITICAL**: After a successful mutation, you **must** invalidate the respective query keys to ensure the UI stays in sync with the server.
- Handle success/error feedback (e.g., `toast`) inside these hooks.
- Use the `axiosClient` from `@/api/axios-client` for all API calls in the `-api/` directory.

```typescript
// Example: src/routes/(posts)/posts/-hooks/useCreatePost.ts
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      toast.success('Post created!');
      // Always invalidate respective keys
      await queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
    },
  });
};
```
