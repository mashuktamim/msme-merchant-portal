import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../-api';
import { toast } from 'sonner';
import { postsKeys } from '../-utils';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      toast.success('Post created successfully!');
      await queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
    },
    onError: () => {
      toast.error('Failed to create post!');
    },
  });
};
