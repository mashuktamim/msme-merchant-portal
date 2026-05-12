import { queryOptions } from "@tanstack/react-query"
import { getPost, getPosts } from "../-api"
import { postsKeys } from "./query-keys"

export const createPostsQueryOptions = () => {
  return queryOptions({
    queryKey: postsKeys.lists(),
    queryFn: getPosts,
  })
}

export const createPostQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: postsKeys.detail(id),
    queryFn: () => getPost(id),
    enabled: !!id,
  })
}