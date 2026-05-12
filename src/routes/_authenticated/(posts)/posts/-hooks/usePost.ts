import { useQuery } from '@tanstack/react-query';
import { createPostQueryOptions } from '../-utils';

export const usePost = (id: number) => {
  return useQuery(createPostQueryOptions(id));
};
