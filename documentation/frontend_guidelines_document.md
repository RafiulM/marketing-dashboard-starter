# Frontend Guideline Document

Welcome to the frontend guidelines for the **marketing-dashboard-starter** project. This document lays out how the frontend is organized, styled, and maintained. It uses plain language so anyone can follow along, even without a deep technical background.

## 1. Frontend Architecture

- **Framework**: We use **Next.js** (a React-based framework) with TypeScript (`.tsx` files). Next.js gives us:
  - **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)** for fast page loads and good SEO.
  - **File-based routing**: folder and file names map directly to URL paths.
  - **API routes** via the `/app/api/` folder, which handle user authentication without needing a separate server setup.

- **Project Structure**:
  - `/app/layout.tsx` – the root layout that wraps the whole app.
  - `/app/globals.css` – global CSS styles.
  - Feature folders like `/app/dashboard/`, `/app/sign-in/`, `/app/sign-up/`, each with their own `layout.tsx` and `page.tsx`.
  - `/app/api/auth/` – Next.js API routes for login and registration logic.

- **Scalability & Maintainability**:
  - **Modularity**: Features are split into folders (`auth`, `dashboard`, etc.). New features get their own folder and layout/page files.
  - **Reusability**: Common layouts and utilities live at the root, so they’re easy to import.
  - **Performance**: Next.js automatically splits code by page, so users only download what they need.

## 2. Design Principles

- **Usability**: Simple, clear navigation and feedback. Sign-in, sign-up, and dashboard pages are straightforward.
- **Accessibility**: We follow basic accessibility rules (semantic HTML, labeled form fields, sufficient color contrast).
- **Responsiveness**: The UI adapts to different screen sizes (desktop, tablet, mobile) using CSS media queries and flexible layouts.
- **Consistency**: Shared styles and components ensure a uniform look and feel across pages.

How we apply these:
- Buttons and links are keyboard-focusable.
- Headings use clear hierarchy (`<h1>`, `<h2>`, etc.).
- Layouts stack or hide elements on smaller screens.
- Form inputs include descriptive labels and error messages.

## 3. Styling and Theming

### Styling Approach
- We use **plain CSS** files, organized as:
  - `globals.css` for base styles (fonts, resets, body background).
  - `theme.css` inside `/app/dashboard/` for dashboard-specific rules.
- **CSS Modules (optional)**: Next.js supports `.module.css` for local scoping if file conflicts arise.
- **Naming Convention**: Adopt **BEM** (Block__Element--Modifier) for clarity, e.g., `.card__title--highlighted`.
- We run styles through **PostCSS** (bundled with Next.js) for autoprefixing.

### Theming
- Themes are handled with **CSS custom properties** (`--primary-color`, `--font-size-base`) defined in `:root` of `globals.css`.
- The dashboard’s `theme.css` can override these variables locally for custom sections.

### Visual Style
- **Design Style**: Modern flat design with subtle glassmorphism accents on cards (slightly blurred, semi-transparent backgrounds).
- **Color Palette**:
  - `--color-primary: #4A90E2;` (blue)
  - `--color-secondary: #50E3C2;` (teal)
  - `--color-accent: #F5A623;` (orange)
  - `--color-bg: #F4F6F8;` (light gray)
  - `--color-text: #333333;` (dark gray)
  - `--color-white: #FFFFFF;`
  - `--color-error: #D0021B;`
  - `--color-success: #7ED321;`

### Typography
- **Font Family**: "Inter", a clean and modern sans-serif font.
- **Base Font Size**: `16px`, with headings scaled relative to it (`h1 = 2rem`, `h2 = 1.5rem`, etc.).

## 4. Component Structure

- **Component-Based**: Each piece of UI (buttons, cards, forms) is its own React component in `/components/`.
- **Organization**:
  - `/components/common/` for shared bits (Button, Input, Card).
  - `/components/dashboard/` for dashboard-specific widgets (ChartWidget, StatsPanel).
- **Reusability**: Components accept props for content and styling flags, so they can be used in multiple places.
- **Folder Layout**: Each component folder contains:
  - `ComponentName.tsx` – the React code.
  - `ComponentName.module.css` – scoped styles (if needed).
  - `index.ts` – re-exports for cleaner imports.

Why it helps:
- Teams can work on different components without stepping on each other.
- Bugs are easier to track and fix in small, focused pieces.
- New pages assemble existing components, speeding up development.

## 5. State Management

- **Local State**: Simple state lives in components via React’s `useState` and `useEffect` hooks.
- **Global State**: Authentication status and user info live in a **React Context** (`AuthContext`) at the root layout. Components can read or update auth state.
- **Data Fetching & Caching**: We recommend using **SWR** or **React Query** for remote data (e.g., marketing stats):
  - Handles caching, revalidation, and error states automatically.
  - Keeps components simple by abstracting fetch logic.

## 6. Routing and Navigation

- **File-Based Routing**: Next.js maps `/app/dashboard/page.tsx` to `/dashboard`, `/app/sign-in/page.tsx` to `/sign-in`.
- **Nested Layouts**:
  - Root layout in `/app/layout.tsx` wraps every page.
  - Dashboard layout in `/app/dashboard/layout.tsx` adds sidebars and headers for all `/dashboard` pages.
- **Client-Side Navigation**: Use Next.js `<Link>` component or `useRouter()` hook to switch pages without full reloads.

## 7. Performance Optimization

- **Code Splitting**: Next.js automatically splits code by page. We also use dynamic imports for heavy libraries (charts, maps):
  ```js
  const Chart = dynamic(() => import('../components/ChartWidget'), { ssr: false });
  ```
- **Lazy Loading**: Non-critical images and components load only when they enter the viewport.
- **Asset Optimization**: Next.js Image component optimizes and lazy-loads images. CSS is minified in production.
- **Static Data**: `data.json` is served as a static asset, reducing API calls during prototyping.
- **Caching**: API responses (via SWR/React Query) cache on the client to avoid repeated network requests.

## 8. Testing and Quality Assurance

- **Unit Tests** with **Jest** and **React Testing Library** for individual components and hooks.
- **Integration Tests** that spin up components with mocked data to ensure they work together (e.g., form + API calls).
- **End-to-End (E2E) Tests** using **Cypress** for key user flows:
  - Signing in and signing out.
  - Viewing dashboard widgets.
- **Linting & Formatting**:
  - **ESLint** enforces code style and catches errors early.
  - **Prettier** formats code consistently on save.
- **Type Checking**: TypeScript flags type mismatches before code runs.
- **Documentation**: We use **JSDoc** comments on complex functions and components.

## 9. Conclusion and Overall Frontend Summary

The frontend of **marketing-dashboard-starter** is built on Next.js and React, with a clear file-based structure for routing and layouts. We follow modern design principles—usability, accessibility, and responsiveness—styled via CSS (with BEM and CSS variables) in a modern flat style with subtle glassmorphism. Components are modular and reusable, state is managed via React Context and data-fetching libraries, and performance is boosted by automatic code splitting and lazy loading. Quality is maintained through a strong testing suite and automated linting/formatting.

This setup makes it easy to:
- Onboard new developers quickly.
- Scale the app by adding features in their own folders.
- Maintain a consistent look and feel.
- Deliver a fast, reliable experience to end users.

Feel free to refer back to these guidelines as you build new pages or components—our goal is a cohesive, maintainable, and high-performing dashboard application.