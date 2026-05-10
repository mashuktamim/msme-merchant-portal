import { createFileRoute } from '@tanstack/react-router'
import { PostList } from '@/routes/(post)/posts/-components/PostList'
import { PostForm } from '@/routes/(post)/posts/-components/PostForm'
import { postsKeys } from '@/routes/(post)/posts/-hooks'
import { getPosts } from '@/routes/(post)/posts/-api'

export const Route = createFileRoute('/(post)/posts/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: postsKeys.lists(),
      queryFn: getPosts,
    })
  },
  component: PostsPage,
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
