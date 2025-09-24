# Backend Structure Document for marketing-dashboard-starter

This document describes the backend setup for the marketing-dashboard-starter project in simple, everyday language. It covers how the system is built, how data is stored and accessed, how different parts talk to each other, where everything lives (hosting), and how we keep things secure and running smoothly.

## 1. Backend Architecture

Overall, the backend is a single, unified system that lives alongside the Next.js front end. It follows these key ideas:

- **Serverless API Routes**
  - Uses Next.js API routes (the `/app/api/` folder) as small, self-contained functions. Each function handles one task, like logging in a user or fetching dashboard data.
  - These functions automatically scale up and down based on traffic, so we don’t have to manage physical servers.

- **Separation of Concerns**
  - Authentication logic is kept in its own folder (`/app/api/auth`).
  - Dashboard data logic is separated into its own endpoints (e.g., `/app/api/dashboard`).

- **Design Patterns**
  - **Repository Pattern:** We group all database calls in dedicated files, so if we change the database later, we only update these files.
  - **Service Layer:** Business rules (e.g., checking passwords, generating tokens) live in “service” files, making code easier to test and maintain.

How this supports our goals:

- **Scalability:** Each API route runs independently, so popular endpoints can scale without affecting others.
- **Maintainability:** Clear folders and layers (API, services, repositories) make it simple to find and update code.
- **Performance:** Serverless endpoints start quickly, and we add caching (see Infrastructure) to speed up repeated requests.

## 2. Database Management

We store all persistent data (users, sessions, marketing records) in a relational database: PostgreSQL.

- **Type:** SQL (relational)
- **System:** PostgreSQL (managed by a cloud provider)
- **ORM (Object-Relational Mapping):** Prisma
  - Lets us write data operations in JavaScript/TypeScript instead of raw SQL.
  - Automatically generates the database schema and helps with migrations.

Data handling practices:

- **Migrations:** Every time we change the data model, we write a migration script. This keeps the live database in sync with our code.
- **Connection Pooling:** We reuse database connections for efficiency.
- **Backups:** Automated daily backups ensure we can restore data if something goes wrong.

## 3. Database Schema

Here’s a human-readable overview of our main tables, followed by an SQL definition.

Users Table:
- **id:** Unique identifier for each user
- **email:** User’s email address (must be unique)
- **password_hash:** Securely stored, hashed password
- **name:** User’s display name
- **role:** User role (e.g., `admin`, `viewer`)
- **created_at / updated_at:** Timestamps for record keeping

Sessions Table:
- **id:** Unique session ID
- **user_id:** Links to the Users table
- **token:** Random token for session identification (stored in a secure cookie)
- **expires_at:** When the session expires

MarketingData Table (example):
- **id:** Unique record ID
- **date:** Date of this data point
- **metric_type:** Type of metric (e.g., `clicks`, `impressions`)
- **value:** Numeric value of the metric
- **created_at:** Timestamp when entry was created

### SQL Schema (PostgreSQL)
```sql
-- Users Table
drop table if exists users;
create table users (
  id serial primary key,
  email varchar(255) unique not null,
  password_hash varchar(255) not null,
  name varchar(100) not null,
  role varchar(50) not null default 'viewer',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Sessions Table
drop table if exists sessions;
create table sessions (
  id serial primary key,
  user_id int references users(id) on delete cascade,
  token varchar(255) unique not null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default now()
);

-- Marketing Data Table
drop table if exists marketing_data;
create table marketing_data (
  id serial primary key,
  date date not null,
  metric_type varchar(100) not null,
  value numeric not null,
  created_at timestamp with time zone default now()
);
```

## 4. API Design and Endpoints

Our backend exposes a set of RESTful endpoints under the `/api` path. Each endpoint is a small function in Next.js.

Authentication Endpoints (`/api/auth`):
- **POST /api/auth/register**
  - Purpose: Create a new user account.
  - Input: email, password, name.
  - Output: Success message or error.

- **POST /api/auth/login**
  - Purpose: Verify credentials and start a session.
  - Input: email, password.
  - Output: Session token set in an HTTP-only cookie.

- **POST /api/auth/logout**
  - Purpose: End the user’s session.
  - Input: Session token (from cookie).
  - Output: Success message.

Dashboard Data Endpoints (`/api/dashboard`):
- **GET /api/dashboard/data**
  - Purpose: Return marketing metrics for display.
  - Input: Optional query parameters (date range, metric type).
  - Output: Array of metric records.

- **POST /api/dashboard/data** (restricted to admins)
  - Purpose: Add new marketing data.
  - Input: date, metric_type, value.
  - Output: Created record.

Each endpoint:
- Checks authentication (and authorization if needed).
- Uses service functions to handle business rules.
- Uses repository functions to read/write the database.

## 5. Hosting Solutions

We host the backend alongside the frontend using a serverless platform. Key points:

- **Platform:** Vercel (for Next.js functions)
  - Automatically deploys API routes as serverless functions.
  - Provides built-in global edge network (CDN) for static assets.
- **Database Host:** Managed PostgreSQL (example: AWS RDS or Cloud SQL)
  - Fully managed, automatic backups, and scaling.

Benefits:
- **Reliability:** Serverless functions have built-in redundancy across regions.
- **Scalability:** Functions and database scale automatically with load.
- **Cost-Effectiveness:** Pay only for function execution time and database usage.

## 6. Infrastructure Components

To ensure fast responses and reliability, we use:

- **Content Delivery Network (CDN):**
  - Vercel’s edge network caches static assets (JavaScript, CSS, images) close to users.
- **Caching Layer (Redis):**
  - Optional Redis instance (e.g., via AWS ElastiCache) to store session data and frequently requested dashboard data.
  - Reduces database load and speeds up responses.
- **Load Balancer:**
  - Built into Vercel’s platform, automatically routes requests to healthy functions.
- **Monitoring and Logging Services:**
  - Centralized log collection (Vercel logs + CloudWatch logs).
  - Real-time error tracking with Sentry (see section 8).

These pieces work together so that:
- Static files load quickly from the nearest edge location.
- API requests are routed to the fastest available function instance.
- Repeated queries use cached data, cutting down on database trips.

## 7. Security Measures

We follow best practices to protect user data and meet regulations:

- **Authentication & Authorization:**
  - Passwords are hashed with bcrypt before saving.
  - Sessions use secure, HTTP-only cookies to store tokens—JavaScript can’t read these cookies.
  - Role-based access control (roles checked on protected endpoints).

- **Data Encryption:**
  - All traffic uses HTTPS/TLS.
  - Database connections are encrypted.

- **Web Protections:**
  - CSRF protection via same-site cookies and CSRF tokens.
  - XSS protection via input sanitization and secure headers (Helmet middleware).
  - Rate limiting on auth endpoints to prevent brute-force attacks.

- **Compliance:**
  - Regular security audits and dependency updates.
  - GDPR-ready: users can request data exports or deletions.

## 8. Monitoring and Maintenance

We keep the system healthy with these tools and processes:

- **Error Tracking:** Sentry captures uncaught errors in API routes and logs stack traces.
- **Performance Monitoring:** New Relic or Datadog tracks response times and CPU/memory usage.
- **Log Aggregation:** Vercel’s built-in logs combined with AWS CloudWatch for database logs.
- **Health Checks:** Automated checks on key endpoints (e.g., `/api/auth/health`).
- **Maintenance Strategies:**
  - **Automated Database Migrations:** Run on each deploy to apply schema changes.
  - **Scheduled Backups:** Daily backups of the database with multi-region replication.
  - **Dependency Updates:** Automated pull requests for library updates (Dependabot).

## 9. Conclusion and Overall Backend Summary

In summary, the marketing-dashboard-starter backend is a clear, scalable, and secure setup built on serverless API routes (Next.js), a managed PostgreSQL database, and modern infrastructure components:

- **Serverless Architecture:** Easy to deploy, scales automatically, and separates logic into small functions.
- **Relational Database:** PostgreSQL with Prisma keeps data structured and easy to manage.
- **Robust API Design:** RESTful endpoints for auth and dashboard data, following a consistent pattern.
- **Managed Hosting and Infrastructure:** Vercel for functions and CDN, Redis caching, and managed RDS for reliability and performance.
- **Strong Security and Monitoring:** Industry best practices for authentication, encryption, and continuous monitoring.

This backend structure aligns with the project’s goal of providing a developer-friendly starter kit. It offers a solid foundation for adding more features—such as advanced analytics, real-time updates, or additional data sources—while remaining easy to understand and operate.