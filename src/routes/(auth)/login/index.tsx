import { createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { useLogin } from './-hooks';
import { LoginSchema } from './-types';
import type { LoginInput } from './-types';

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
});

function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  const defaultValues: LoginInput = {
    email: '',
    password: '',
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      login(value);
    },
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">

      <Card className="relative z-20 w-full max-w-md bg-black/40 text-white shadow-2xl backdrop-blur-md animate-in fade-in zoom-in duration-500 border border-white/50">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Merchant Portal</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardContent className="grid gap-4">
            <form.Field
              name="email"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name} className="text-gray-300">Email</FieldLabel>
                  <Input
                    id={field.name}
                    type="email"
                    placeholder="admin@example.com"
                    className="border-white/20 bg-white/5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-primary/50"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name} className="text-gray-300">Password</FieldLabel>
                  <Input
                    id={field.name}
                    type="password"
                    placeholder="••••••••"
                    className="border-white/20 bg-white/5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-primary/50"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </CardContent>
          <CardFooter className=''>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isPending || isSubmitting ? 'Logging in...' : 'Sign In'}
                </Button>
              )}
            />
          </CardFooter>
        </form>
      </Card>

      <div className="absolute bottom-8 z-20 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Merchant Portal. All rights reserved.
      </div>
    </div>
  );
}
