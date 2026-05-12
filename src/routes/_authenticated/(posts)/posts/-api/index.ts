import axiosClient from '@/api/axios-client';
import type { Post } from '@/routes/(posts)/posts/-types';

export const getPosts = async (): Promise<Post[]> => {
  const response = await axiosClient.get<Post[]>('/posts');
  return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await axiosClient.post<Post>('/posts', post);
  return response.data;
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await axiosClient.get<Post>(`/posts/${id}`);
  return response.data;
};