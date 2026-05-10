import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  body: z.string().min(10, 'Body must be at least 10 characters'),
  userId: z.number().optional(),
});

export type Post = z.infer<typeof PostSchema>;
