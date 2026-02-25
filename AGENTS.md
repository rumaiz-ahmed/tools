# AGENTS.md

Guidelines for AI agents operating in this repository.

---

## Project Overview

**Tools** is a collection of 10 free online utilities. The mission is to build high-quality, accessible online tools that are free for everyone to use.

**Website:** https://tools.dev (when deployed)

**Tech Stack:**
- TanStack Start + TanStack Router (file-based routing)
- React 19 + TypeScript
- Vite + Cloudflare Workers
- TailwindCSS v4
- Vitest for testing
- Zod for validation

---

## Available Tools

| Tool | Route | Description |
|------|-------|-------------|
| Calculator | `/tools/calculator` | Basic operations with history |
| Date Calculator | `/tools/date-calculator` | Add/subtract dates, date difference |
| World Clock | `/tools/world-clock` | Multiple time zones with live updates |
| Text Tools | `/tools/text-tools` | Word count, case converter, reverse, sort |
| Color Converter | `/tools/color-converter` | HEX/RGB/HSL conversion with picker |
| JSON Formatter | `/tools/json-formatter` | Format, minify, validate JSON |
| Image Converter | `/tools/image-converter` | Convert PNG/JPG/WebP/GIF |
| PDF Tools | `/tools/pdf-tools` | Merge, compress PDFs |
| URL Shortener | `/tools/url-shortener` | Shorten URLs |
| Unit Converter | `/tools/unit-converter` | Length, weight, temp, volume, time |

---

## Commands

### Development
```bash
npm install             # Install dependencies
npm run dev            # Start dev server on port 3000
```

### Building
```bash
npm run build          # Build for production
npm run preview       # Preview production build locally
```

### Testing
```bash
npm run test                    # Run all tests
npm run test -- {filename}      # Run specific test file
npm run test -- --watch         # Watch mode
npm run test -- -t "test name"  # Run tests matching name
```

### Deployment
```bash
npm run deploy     # Build and deploy to Cloudflare Workers
```

### Type Generation
```bash
npm run cf-typegen # Generate Cloudflare types (wrangler types)
```

---

## Adding New Tools

Tools are implemented in `src/tools/<tool-name>/` and exported to routes in `src/routes/tools/`.

Example tool structure:
```tsx
// src/tools/my-tool/index.tsx
export function MyTool() {
  return <div>My Tool Component</div>
}

// src/routes/tools/my-tool.tsx
import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { MyTool } from "@/tools/my-tool"
import { ArrowLeft } from "lucide-react"

export const Route = createFileRoute("/tools/my-tool")({
  component: MyToolPage,
})

function MyToolPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Link to="/discover" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to All Tools
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <MyTool />
      </div>
    </div>
  )
}
```

Tools should:
- Be accessible on both desktop and mobile
- Follow existing code patterns and styling
- Include proper documentation
- Handle errors gracefully

---

## Code Style

### TypeScript

- **Strict Mode Enabled**: All strict TypeScript options are on
- Use `const` by default; use `let` only when reassignment is required
- Never use `any` — use `unknown` and narrow properly
- Avoid `var` — use `const`/`let`

### Imports

- Use path alias `@/*` for local imports:
  ```typescript
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  ```
- Use named exports (except framework pages/layouts requiring default)
- Use `import type { Type }` when importing only types

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `Select`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMobile`)
- **Utilities**: camelCase (e.g., `cn`, `formatDate`)
- **Files**: kebab-case for utilities, PascalCase for components
  - Components: `button.tsx`, `select.tsx`
  - Hooks: `use-mobile.ts`
  - Utils: `utils.ts`

### Component Patterns

Use shadcn/ui patterns with cva for variants:

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("base classes...", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
})

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

### TailwindCSS

- Use TailwindCSS v4 with CSS variables from shadcn/ui
- Use `cn()` utility to merge Tailwind classes
- Follow shadcn/ui "new-york" style

### Error Handling

- Handle errors explicitly — never swallow silently
- Use try/catch with meaningful error messages
- Use Zod for runtime validation

### Testing

- Use Vitest with @testing-library/react
- Test files use `.test.ts` or `.test.tsx` extension
- Place tests next to the files they test

---

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom React hooks
├── lib/              # Utilities (utils.ts)
├── routes/           # TanStack Router routes (file-based)
│   ├── index.tsx     # Home/Landing page
│   ├── discover.tsx  # All Tools listing page (/discover)
│   ├── tools/        # Individual tool route files
│   │   └── calculator.tsx
│   └── api/          # API routes
├── tools/            # Tool implementations (reusable)
│   └── calculator/
│       └── index.tsx
├── router.tsx        # Router configuration
└── routeTree.gen.ts  # Generated route tree
```

---

## Routes

- `/` — Home/Landing page
- `/discover` — All Tools listing page
- `/tools/<tool-name>` — Individual tool pages

---

## Design Guidelines

### Color Scheme
- **Primary:** Black on White (minimal aesthetic)
- Use black (#000000) text on white (#ffffff) background
- Gray tones for secondary text (#666666, #999999)
- No colored accents - keep it monochrome

### Typography
- Bold, large typography for headlines
- Use tracking-tight for headings
- Clean sans-serif fonts

### Animations
- Use staggered entrance animations with `transition-all duration-XXX delay-XXX`
- Add hover effects on cards (shadow-lg, scale, border color change)
- Use smooth transitions (300-500ms)

### Layout
- Max width container: `max-w-6xl mx-auto px-6`
- Fixed header with backdrop blur
- Responsive grid layouts
- Minimal borders and shadows

---

## Configuration Files

- `tsconfig.json` — TypeScript config (strict, ES2022, paths)
- `vite.config.ts` — Vite + TanStack + Cloudflare + Tailwind
- `components.json` — shadcn/ui configuration
- `wrangler.jsonc` — Cloudflare Workers config

---

## Key Patterns

### Navigation (SPA)
```typescript
import { Link } from "@tanstack/react-router"

<Link to="/discover">All Tools</Link>
<Link to="/tools/calculator">Calculator</Link>
```

### Data Loading with Loaders
```typescript
export const Route = createFileRoute("/tools/my-tool")({
  loader: async () => {
    const response = await fetch("https://api.example.com/data")
    return response.json()
  },
  component: MyToolPage,
})

function MyToolPage() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

### Server Functions
```typescript
import { createServerFn } from "@tanstack/react-start"

const getServerTime = createServerFn({
  method: "GET",
}).handler(async () => {
  return new Date().toISOString()
})
```

### API Routes
```typescript
import { createFileRoute } from "@tanstack/react-router"
import { json } from "@tanstack/react-start"

export const Route = createFileRoute("/api/my-endpoint")({
  server: {
    handlers: {
      GET: () => json({ message: "Hello!" }),
    },
  },
})
```

### Using Radix UI Primitives
```typescript
import * as SelectPrimitive from "radix-ui"
```

### Adding Data Attributes
```typescript
<Comp data-slot="component-name" data-variant={variant} />
```

### Form Validation with Zod
```typescript
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof formSchema>
```

---

## Common Tasks

### Adding a New Tool
1. Create a new file in `src/routes/tools/` (e.g., `my-tool.tsx`)
2. Use `createFileRoute` with the path `/tools/my-tool`
3. Implement your tool component
4. TanStack Router auto-generates the route

### Adding a New UI Component
1. Use shadcn CLI: `npx shadcn add <component>`
2. Or copy from shadcn/ui registry with "new-york" style

### Running Type Check
```bash
npx tsc --noEmit
```

---

## Notes

- Demo files (prefixed with `demo`) can be safely deleted
- No ESLint config present — rely on TypeScript strict mode
- Uses `verbatimModuleSyntax` — import types explicitly
- Deployment targets Cloudflare Workers via Wrangler
- Development server runs on port 3000

---

## SEO Best Practices

When adding new pages/tools, ensure:

### Meta Tags (in `__root.tsx`)
```tsx
head: () => ({
  meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "Tool Name - Tools" },
    { name: "description", content: "Description under 160 chars" },
    { name: "keywords", content: "relevant, keywords, here" },
    { property: "og:title", content: "Tool Name - Tools" },
    { property: "og:description", content: "Share description" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
})
```

### Structure
- One H1 per page
- Use semantic HTML (header, main, footer, nav)
- Add alt text to images
- Use descriptive link text (not "click here")

### Schema Markup
Add JSON-LD for tools:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Tool Name",
      "description": "Description",
      "url": "https://tools.dev/tools/tool-name",
    })
  }}
/>
```
