import { createFileRoute } from '@tanstack/react-router'
import { PostList } from './-components/PostList'
import { PostForm } from './-components/PostForm'
import { createPostsQueryOptions } from './-utils'

export const Route = createFileRoute('/_authenticated/(posts)/posts/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.fetchQuery(createPostsQueryOptions())
  },
  component: PostsPage,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
})

function PostsPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Posts Management</h1>
        <p className="text-muted-foreground">Manage your merchant posts and updates.</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4">
          <PostForm />
        </aside>

        <main className="lg:col-span-8">
          <PostList />
        </main>
      </div>
    </div>
  )
}
