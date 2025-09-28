# Project Requirements Document: Marketing Dashboard Starter

## 1. Project Overview

This Marketing Dashboard Starter is a web-based application designed to help small to mid-size marketing teams quickly connect their advertising and analytics accounts, visualize key performance metrics, and generate simple reports—all in one place. Instead of logging into multiple platforms (like Google Analytics, Facebook Ads, or LinkedIn Campaign Manager), marketers can sign in once, link their accounts, and see traffic, engagement, and conversion data on a unified dashboard.

The core problem it solves is scattered data and time-consuming manual reporting. By automating data pulls via APIs and wrapping them in easy-to-read charts and tables, this Starter Kit speeds up decision-making and provides an all-in-one overview of campaign health. Key success criteria include straightforward account integrations, sub-2-second dashboard load times, and clear visualizations for top metrics like sessions, clicks, and revenue.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (First Version)
- User registration, login, and secure session management (email/password + optional SSO)
- OAuth-based integrations with Google Analytics and Facebook Ads
- Automated data fetching (daily) and storage in a relational database
- Dashboard UI with date range picker showing:
  - Site traffic trends (sessions, users, pageviews)
  - Ad performance (impressions, clicks, cost)
  - Basic conversion metrics (leads, goals)
- Chart components (line, bar, pie) to visualize trends
- Simple report export (CSV download of raw metrics)
- Admin panel to manage connected accounts and view API fetch status

### Out-of-Scope (Phase 2+)
- Integration with additional platforms (LinkedIn Ads, Twitter Ads, etc.)
- Advanced segmentation or funnel analysis
- Custom metric builder or SQL editor
- Mobile app or PWA optimizations
- Role-based access control beyond basic admin/user
- AI-driven insights or forecasting

## 3. User Flow

A new marketing user lands on the public homepage and clicks “Sign Up.” They provide their email and a password or use an SSO button (Google Workspace). Once registered, they’re taken to an onboarding screen where they click “Connect Account.” They choose Google Analytics, complete the OAuth consent, and then repeat for Facebook Ads. The app confirms each connection and displays a success message.

Next, the user arrives at the main dashboard view. At the top, they see a date range picker defaulting to the last 7 days. Below, three panels show site traffic trends, ad performance, and conversions in chart form. A left sidebar offers navigation links: Dashboard, Reports, Account Settings, Admin. If they click “Export CSV,” a file containing raw data for the selected date range downloads immediately. In Account Settings, the user can re-authorize or disconnect any linked platform.

## 4. Core Features

- **Authentication & Authorization**: Email/password signup, login, session cookies, and optional SSO.
- **OAuth Integrations**: Connect to Google Analytics and Facebook Ads APIs, securely store OAuth tokens.
- **Data Ingestion Pipeline**: Scheduled jobs (cron) to fetch metrics daily, handle rate limiting, and log errors.
- **Dashboard UI**: Responsive layout with sidebar navigation, date picker, and chart panels.
- **Charts & Tables**: Line charts, bar charts, and tabular views for metrics; interactive tooltips.
- **Report Export**: CSV download of raw metrics for any selected date range.
- **Admin Panel**: View connection status, last fetch time, and error logs for each integration.
- **Settings Management**: Re-authorize OAuth tokens, change password, update profile.

## 5. Tech Stack & Tools

- **Frontend**: Next.js (React), Tailwind CSS for styling, Chart.js or Recharts for charts.
- **Backend**: Node.js with Express or Fastify, Postgres database on Supabase or AWS RDS.
- **Job Scheduler**: Node-cron or BullMQ for daily data pulls.
- **Authentication**: NextAuth.js (email/password + OAuth) or Auth0.
- **API Integrations**: Google Analytics Data API v4, Facebook Marketing API.
- **Deployment**: Vercel (frontend) and Heroku or AWS Elastic Beanstalk (backend).
- **IDE/Dev Tools**: VS Code, Prettier, ESLint, GitHub Actions for CI/CD.
- **Optional AI**: Future GPT-based insights (e.g., GPT-4o) to generate summary/alerts.

## 6. Non-Functional Requirements

- **Performance**: Dashboard pages load in under 2 seconds on a 3G connection.
- **Scalability**: Support up to 10,000 users and 1,000 API fetches per day without manual intervention.
- **Security**: Encrypt OAuth tokens at rest, use HTTPS everywhere, follow OWASP Top 10.
- **Reliability**: 99.9% uptime, automated retry on API failures, alert on critical job errors.
- **Usability**: Accessible UI (WCAG AA), mobile-responsive layout, clear error messages.
- **Compliance**: GDPR data handling for EU users, allow data deletion on request.

## 7. Constraints & Assumptions

- We assume valid API credentials and developer access to Google Analytics and Facebook Ads accounts.
- OAuth flows depend on third-party consent screens; any downtime there affects data fetch.
- Postgres is chosen; if Supabase is unavailable, fallback to AWS RDS.
- Users have modern browsers (Chrome, Firefox, Edge) and reasonable internet speeds.

## 8. Known Issues & Potential Pitfalls

- **API Rate Limits**: Both Google and Facebook impose quotas. Mitigate with backoff strategies and caching.
- **Data Consistency**: Time zone mismatches between platforms. Standardize all dates to UTC in the database.
- **Token Expiry**: OAuth tokens can expire or be revoked. Implement auto-refresh and notify users on failure.
- **Schema Changes**: Third-party APIs may change field names. Build a thin mapping layer for easier updates.
- **Error Visibility**: Hidden failures in background jobs. Provide a clear error log dashboard and email alerts for critical failures.

---

This document serves as the single source of truth for building the Marketing Dashboard Starter. Each section is written clearly to guide the AI or development team in subsequent design, architecture, and implementation steps without any guesswork.