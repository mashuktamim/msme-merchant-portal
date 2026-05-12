import { useQuery } from '@tanstack/react-query';
import { createPostsQueryOptions } from '../-utils';

export const usePosts = () => {
  return useQuery(createPostsQueryOptions());
};
