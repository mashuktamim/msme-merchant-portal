import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-linear-to-b from-background to-muted/20 px-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-primary">
          Welcome to the <span className="text-indigo-600">Merchant Portal</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage your products, posts, and merchant profile with our modern, high-performance portal.
          Built with TanStack Router, Query, and shadcn/ui.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/posts">
            <Button size="lg" className="px-8">
              Manage Posts
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8">
            View Analytics
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Fast Performance</CardTitle>
            <CardDescription>Optimized with Vite and TanStack.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Modern UI</CardTitle>
            <CardDescription>Styled with Tailwind v4 and shadcn/ui.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Type Safe</CardTitle>
            <CardDescription>End-to-end type safety with TypeScript.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
