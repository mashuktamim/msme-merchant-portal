import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, getPost, getPosts } from '../-api';
import type { Post } from '../-types';

export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (filters: string) => [...postsKeys.lists(), { filters }] as const,
  details: () => [...postsKeys.all, 'detail'] as const,
  detail: (id: number) => [...postsKeys.details(), id] as const,
};

export const usePosts = () => {
  return useQuery({
    queryKey: postsKeys.lists(),
    queryFn: getPosts,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Optimistic update or just invalidate
      queryClient.setQueryData<Post[]>(postsKeys.lists(), (old) =>
        old ? [newPost, ...old] : [newPost]
      );
    },
  });
};
export const usePost = (id: number) => {
  return useQuery({
    queryKey: postsKeys.detail(id),
    queryFn: () => getPost(id),
    enabled: !!id,
  });
};
