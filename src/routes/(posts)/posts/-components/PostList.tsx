import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createPostsQueryOptions } from '../-utils/query-options';
import { useQuery } from '@tanstack/react-query';

export const PostList = () => {
  const { data: posts } = useQuery(createPostsQueryOptions())

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Posts</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {posts?.map((post) => (
          <Link
            key={post.id}
            to="/posts/$postId"
            params={{ postId: String(post.id) }}
            className="block no-underline"
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-muted-foreground/20 hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.body}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
