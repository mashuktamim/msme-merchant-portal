export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (filters: string) => [...postsKeys.lists(), { filters }] as const,
  details: () => [...postsKeys.all, 'detail'] as const,
  detail: (id: number) => [...postsKeys.details(), id] as const,
};