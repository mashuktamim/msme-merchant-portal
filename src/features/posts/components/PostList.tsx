import { usePosts } from '../hooks';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const PostList = () => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <h2 className="text-xl font-bold">Posts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="p-4 text-destructive">Error loading posts</div>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Posts</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {posts?.slice(0, 10).map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
