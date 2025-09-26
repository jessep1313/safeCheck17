# Agent Guidelines for safeCheck17

## Build/Lint/Test Commands

### Frontend (JavaScript/TypeScript)

- **Build**: `npm run build` (Vite production build)
- **Dev server**: `npm run dev` (Vite dev server)
- **Lint**: `npm run lint` (ESLint with auto-fix)
- **Format**: `npm run format` (Prettier on resources/)
- **Type check**: `npm run types` (TypeScript check)
- **Format check**: `npm run format:check` (Prettier check)

### Backend (PHP/Laravel)

- **Test all**: `composer test` or `php artisan test` (Pest framework)
- **Test single**: `php artisan test --filter=TestName` (replace TestName with class/method)
- **Dev server**: `composer run dev` (Laravel + Vite concurrently)

## Code Style Guidelines

### TypeScript/JavaScript

- **Imports**: Use `@/` path alias for `resources/js/*`
- **Quotes**: Single quotes (`'`)
- **Semicolons**: Required
- **Indentation**: 4 spaces (tabs)
- **Line width**: 150 characters max
- **JSX**: `react-jsx` (no React import needed)
- **Types**: Strict TypeScript enabled, explicit types preferred
- **React**: Functional components with hooks, no prop-types
- **Styling**: Tailwind CSS with `clsx`/`cn` utilities

### PHP

- **Framework**: Laravel 12 with standard conventions
- **Testing**: Pest framework
- **Namespace**: PSR-4 (`App\` for app/, `Tests\` for tests/)
- **Inertia.js**: Used for SPA routing

### General

- **EditorConfig**: 4 spaces, UTF-8, LF line endings, trim whitespace
- **Formatting**: Prettier with organize-imports and Tailwind plugins
- **Linting**: ESLint with React/React Hooks rules, Prettier integration
- **File extensions**: `.tsx` for React components, `.ts` for utilities

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `UserProfile`)
- **Files**: kebab-case for components (e.g., `user-profile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useFormFields`)
- **Types**: PascalCase interfaces, camelCase type aliases
- **PHP classes**: PascalCase (e.g., `UserController`)

### Error Handling

- **TypeScript**: Leverage strict mode and explicit error types
- **React**: Use error boundaries for component errors
- **PHP**: Laravel's exception handling and validation

### Imports

- **Organize**: Prettier plugin sorts imports automatically
- **React**: No manual import needed (JSX transform)
- **Internal**: Use `@/` alias for clean imports
- **External**: Group by type (React, UI libs, utilities)
