# Form Handling & Validation Rules

Forms in the Merchant Portal must be built using **TanStack Form** with **Zod** validation.

## 1. Schema-Driven Validation

- Every form must have a Zod schema defined in the route's `-types/` directory.
- Infer the TypeScript type from the Zod schema to ensure a single source of truth.

```typescript
// Example: src/routes/(posts)/posts/-types/index.ts
export const PostSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
})

export type Post = z.infer<typeof PostSchema>
```

## 2. TanStack Form Integration

- Use the `useForm` hook from `@tanstack/react-form`.
- Pass the Zod schema to the `validators.onSubmit` property.
- Handle form submission using a `mutate` call from a custom hook.

## 3. UI Components (The "Field" Pattern)

Use the centralized UI field components for consistency:

- `Field`: The container.
- `FieldLabel`: The input label.
- `FieldError`: Displays validation errors.
- `FieldGroup`: Groups multiple fields.

### Implementation Example

```tsx
<form.Field
  name="title"
  children={(field) => {
    const isInvalid =
      field.state.meta.isTouched && field.state.meta.errors.length > 0
    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    )
  }}
/>
```

## 4. Form Submission

- Always call `e.preventDefault()` and `e.stopPropagation()` in the form's `onSubmit`.
- Use `form.Subscribe` to manage the submit button state (loading, disabled).
- Reset the form using `form.reset()` on successful submission.
