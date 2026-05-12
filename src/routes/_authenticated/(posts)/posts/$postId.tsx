import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { createPostQueryOptions } from './-utils'
import { usePost } from './-hooks'

export const Route = createFileRoute('/_authenticated/(posts)/posts/$postId')({
  loader: async ({ params: { postId }, context: { queryClient } }) => {
    const id = Number(postId)
    await queryClient.fetchQuery(createPostQueryOptions(id))
  },
  component: PostDetailPage,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
})

function PostDetailPage() {
  const { postId } = Route.useParams()
  const { data: post } = usePost(Number(postId))

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl space-y-6">
      <Button variant="ghost" className="mb-4">
        <Link to="/posts" className='flex items-center'>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Link>
      </Button>

      <Card className="border-none shadow-lg bg-linear-to-br from-card to-muted/50">
        <CardHeader className="space-y-4">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary w-fit">
            Post ID: {post?.id}
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-balance">
            {post?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed text-muted-foreground">
              {post?.body}
            </p>
          </div>
          <div className="mt-8 pt-8 border-t flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center font-bold text-primary">
                {post?.userId}
              </div>
            </div>
            <span>User {post?.userId}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
