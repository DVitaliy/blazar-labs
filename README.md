# Client Management App

This is an MVP of a client management system (CRM-style) built with **Next.js 15 (App Router + React 19)**. The original goal was to implement the functional and architectural requirements from this [specification document](https://docs.google.com/document/d/1YcXCIYOOyvOt5wJHBNW61z7x5SWzROTc/edit?tab=t.0), within a 2–7 hour scope.

---

## ✅ Specification Review (What’s Done)

| Feature                                           | Status | Notes                                                                                       |
| ------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| Scalable architecture suitable for large projects | ✅     | See structure below                                                                         |
| Proper use of App Router and Server Components    | ✅     | All routing done in `app/` directory                                                        |
| Form submission using Server Actions              | ✅     | `useActionState`, `useFormStatus`, and async actions used                                   |
| Database integration                              | ✅     | Uses Prisma with SQLite by default, can be switched to PostgreSQL                           |
| Server validation (not client-only)               | ✅     | Validated in `server action`                                                                |
| Form button loading state                         | ✅     | Uses `useFormStatus()`                                                                      |
| Tailwind CSS integration                          | ✅     | With optional BEM methodology if desired                                                    |
| Test coverage                                     | ✅     | Uses Vitest, see [`createClientAction.test.ts`](./src/__tests__/createClientAction.test.ts) |
| Separation of logic/data access                   | ✅     | Via repository pattern in `lib/datasource`                                                  |
| Revalidation with `revalidatePath`                | ✅     | After creating new client                                                                   |
| Simple user feedback after action                 | ✅     | Shows error or redirects                                                                    |
| Proper project structure                          | ✅     | See below                                                                                   |

---

## ⚠️ Skipped / YAGNI by design

| Feature                                            | Reason                                                                                                                     |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| State management (Zustand / Redux / Context)       | ❌ Not implemented due to YAGNI principle — no complex shared state required at this stage                                 |
| Show interaction history                           | ❌ If meant as full audit trail, it adds unnecessary abstraction for MVP. Created/Updated timestamps are already available |
| Full backend separation (e.g. Express.js / NestJS) | ❌ Not necessary — Next.js 15 with Server Actions covers all API needs. Can expose API routes if needed                    |
| Authentication / Authorization                     | ❌ Out of MVP scope                                                                                                        |
| Pagination / Filtering                             | ❌ Not required for MVP with limited records                                                                               |

---

## 🏗️ Project Structure

```
app/
├── clients/             # Client pages (list, add)
├── layout.tsx           # Root layout
├── page.tsx             # Main page
components/
├── clients/ClientForm.tsx
├── ui/SubmitButton.tsx
lib/
├── db.ts
├── actions/             # Server actions
├── datasource/        # JSON + Prisma implementations
prisma/
├── schema.prisma
data/
├── clients.json         # Local dev DB alternative
```

---

## 🧰 Tech Stack

- **React 19** with Server Actions (`useActionState`, `useFormStatus`)
- **Next.js 15** (App Router)
- **Prisma ORM**
- **SQLite** for local dev / MVP
- **Tailwind CSS**
- **Vitest** for unit testing
- **TypeScript** strict
- Optional: follows **BEM** if desired (via class naming)

---

## 🚀 Installation & Development

```bash
pnpm install
pnpm prisma:generate      # Generate Prisma client
pnpm prisma:migrate       # Create local SQLite db (file: ./dev.db)
pnpm dev                  # Run in development
```

---

## 🧪 Testing

```bash
pnpm test
```

See working example test: [`createClientAction.test.ts`](./src/__tests__/createClientAction.test.ts)

---

## 🗄️ Database Configuration

For local development:

```env
DATABASE_URL="file:./dev.db"
```

For production:

- Update `prisma/schema.prisma` to use `provider = "postgresql"`
- Update `.env`:

```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
```

Then run:

```bash
pnpm prisma:migrate:deploy
```

---

## ✨ Notes on Maintainability

- Codebase follows **modular architecture**: each domain (clients, actions, components) is split and isolated
- Developers will not conflict during collaboration — each feature is scoped
- CSS is written with **Tailwind**, but components can follow **BEM** ideology if needed
- JSON-based development mode avoids DB setup overhead, but production-ready layer is abstracted

---

## 📌 Final Notes

This codebase is a great starting point for building scalable, modern CRM or admin-style apps. The principles of simplicity, modularity and pragmatism (YAGNI) were followed to ensure speed and maintainability.
