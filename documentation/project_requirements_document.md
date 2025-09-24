# Project Requirements Document (PRD)

## 1. Project Overview

The **marketing-dashboard-starter** is a boilerplate web application designed to get a marketing analytics dashboard up and running in minutes. Instead of spending days wiring up authentication, routing, layouts, and styles, developers can clone this starter kit and immediately focus on plugging in real data sources and custom visualizations. It provides user sign-in/sign-up flows, a basic dashboard page, and a clean global structure—all built on Next.js and TypeScript.

This kit solves the initial setup and organizational challenges of a marketing dashboard project. By delivering a working foundation, it reduces repetitive tasks and enforces best practices like file-based routing, modular layouts, and scoped styling. Success for version 1.0 means that a developer can:

• Register or log in as a user and land on a dashboard.
• See sample data rendered on the dashboard from a static JSON file.
• Extend the codebase by adding new pages or widgets without reconfiguring core infrastructure.

## 2. In-Scope vs. Out-of-Scope

In-Scope (Version 1.0):
• User registration (sign-up) and login (sign-in) pages.
• Next.js API routes under `/app/api/auth/` for handling credential submission.
• Protected dashboard area under `/dashboard` with its own layout and static data display (`data.json`).
• Root and dashboard-specific layouts (`layout.tsx`) for consistent page structure.
• Global styling (`globals.css`) and dashboard theme styling (`theme.css`).

Out-of-Scope (Reserved for Later Phases):
• Integration with a real database or external backend for user data.
• Advanced charting or data visualization libraries (e.g., Chart.js, D3).
• Role-based access control (only a basic authenticated session exists).
• Mobile-first or responsive design optimizations beyond default CSS behavior.
• Automated test suite (unit, integration, end-to-end).
• Performance tuning (beyond basic Next.js defaults) and CDN configuration.

## 3. User Flow

A new visitor lands on the home page and sees two clear options: **Sign Up** or **Sign In**. If they choose **Sign Up**, they’re taken to `/sign-up/page.tsx` where they fill in a name, email, and password. Upon submission, the form calls the API endpoint `/api/auth/register`, which returns a secure, HTTP-only session cookie. The user is then redirected to the dashboard at `/dashboard`.

Once authenticated, the user sees the dashboard’s layout: a sidebar for navigation (future pages), a header with a logout button, and a main content area. The main area loads static data from `data.json` and displays it via placeholder components. If the session expires or the user logs out, they are sent back to `/sign-in` to reauthenticate.

## 4. Core Features

- **Authentication Module**  
  • Sign-up page at `/sign-up/page.tsx`  
  • Sign-in page at `/sign-in/page.tsx`  
  • API routes in `/app/api/auth/` for `register` and `login`  
  • Secure HTTP-only cookie management for sessions

- **Dashboard Module**  
  • Dashboard layout at `/app/dashboard/layout.tsx` (sidebar, header, footer)  
  • Main dashboard page at `/app/dashboard/page.tsx`  
  • Static data loader reading `/app/dashboard/data.json`

- **Routing & Layouts**  
  • File-based routing courtesy of Next.js App Router  
  • Root layout in `/app/layout.tsx` wrapping all pages

- **Styling**  
  • Global CSS in `globals.css`  
  • Dashboard theme overrides in `theme.css`

## 5. Tech Stack & Tools

- Frontend Framework: **Next.js** (built on React) with the App Router
- Language: **TypeScript** (.tsx files) for type safety
- Styling: **CSS** (globals and scoped theme files)
- Server/API: Next.js API routes (Node.js under the hood)
- IDE & Extensions: VS Code with **ESLint** and **Prettier** recommended
- Optional Later Add-Ons: React Query or SWR for data fetching, Zustand or Redux Toolkit for state management

## 6. Non-Functional Requirements

- **Performance**: Initial page load should complete within 1–2 seconds on a 3G connection. Leverage Next.js automatic code splitting.
- **Security**: Store sessions in HTTP-only cookies, protect API routes with authentication checks, sanitize inputs to prevent XSS.
- **Usability**: Clear form validation messages, consistent navigation labels, and minimal friction in the sign-up/sign-in process.
- **Accessibility**: Keyboard-navigable forms and buttons; basic ARIA labels for form fields.
- **Maintainability**: Enforce coding standards via ESLint/Prettier; organize code into feature folders.

## 7. Constraints & Assumptions

- The project relies on Next.js’s App Router (requires Next.js 13+).
- Placeholder data in `data.json` stands in for real analytics endpoints.
- No external database is configured; authentication logic assumes a stub or in-memory store.
- Node.js v16+ environment with support for modern ES modules.
- Users are assumed to have only one role (no RBAC implemented).

## 8. Known Issues & Potential Pitfalls

- **Stubbed Authentication**: Without a real database, user data isn’t persistent. Mitigation: swap in a real DB adapter (e.g., Prisma + PostgreSQL) before production.
- **Static Data Only**: `data.json` is a mock. Future integration with real API may require refactoring fetch logic.
- **CSS Specificity Conflicts**: Global styles may leak into dashboard theme. Fix: scope dashboard styles with a CSS module or prefix classes.
- **Session Expiry Handling**: No refresh token logic—users may be logged out unexpectedly. Future improvement: implement token refresh flow.
- **API Rate Limits**: If heavy frontend polling is added, be mindful of Next.js API route limits; add caching or throttle where needed.

---
This PRD captures all essentials for version 1.0 of **marketing-dashboard-starter**. The AI model can now use this as the single source of truth to generate next-level documents (Tech Stack Details, Frontend Guidelines, Backend Structure, App Flow, File Structure, etc.) without further clarification.