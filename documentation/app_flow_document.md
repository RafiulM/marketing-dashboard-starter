# Marketing Dashboard Starter App Flow Document

## Onboarding and Sign-In/Sign-Up

When a new user first encounters the application, they land on the sign-in page by visiting the base URL. If they are not already authenticated, they see a clear prompt to either sign in or create a new account. To register, the user clicks the “Sign Up” link, which navigates them to the sign-up page. There, they enter their email address, choose a secure password, and submit the form. The page then calls the internal API route for registration, which validates the input, creates a new user record, and returns a success response. Once the account is created, the application automatically signs the user in and redirects them to the main dashboard.

Existing users return to the sign-in page, enter their email and password, and submit the form. The sign-in page invokes the login API route, checks the credentials against stored records, and on success sets a secure session cookie. The user is then redirected to the dashboard. If the credentials are invalid, the page displays an inline error message prompting the user to try again.

The application provides a sign-out link in the dashboard header. When a user clicks this link, the session cookie is cleared and the user is redirected back to the sign-in page. For lost passwords, the starter kit does not include a ready-made reset flow, but it can be added by creating a “Forgot Password” page that calls a password-reset API endpoint and allows users to reset their credentials via email.

## Main Dashboard or Home Page

After signing in, the user lands on the dashboard page at the `/dashboard` route. This page uses the dashboard layout, which wraps all dashboard content in a consistent header and sidebar. The sidebar shows links for Dashboard and any future sections, and the header displays the application title along with the user’s avatar or sign-out link. The central area of the dashboard page renders charts and metrics drawn from a static `data.json` file, giving an immediate view of key marketing numbers. From this page, users can navigate to other dashboard sections or click settings in the header to manage their account. The global layout ensures that the sidebar and header remain in place as the user moves through different dashboard pages.

## Detailed Feature Flows and Page Transitions

When the user clicks the Dashboard link in the sidebar, the application transitions to `/dashboard` and reloads the dashboard page component. The component fetches `data.json` on the server side and renders widgets for visits, conversions, and revenue. If a developer adds new data visualizations, they simply update the JSON file or replace the data fetch with a call to a real API.

Navigating to sign-up or sign-in changes the URL to `/sign-up` or `/sign-in`. These pages share the same global layout but omit the dashboard sidebar to keep the focus on authentication. Each form submission triggers a POST request to the corresponding API route in `/api/auth/register` or `/api/auth/login`. On success, the user is programmatically redirected to the dashboard. On error, the page shows an inline message and retains the user’s input so they can correct any mistakes.

The global layout at the root level ensures that any new pages a developer adds will inherit the same styling and head elements. For example, if you add a profile page at `/profile`, the user can click a new link in the sidebar and see the new content rendered within the same layout.

## Settings and Account Management

Currently, the starter kit does not include a dedicated settings or profile management page. However, users can manage their account by signing out via the header link. To extend the application, a developer can create a new `/settings` route and add links in the sidebar. That page would use the global layout and allow users to update personal information or preferences. Once changes are saved, the user can click the Dashboard link in the sidebar to return to the main workflow.

## Error States and Alternate Paths

If a user submits the sign-in or sign-up form with invalid data, the form fields remain populated and an error message appears above the form explaining the issue. When the dashboard tries to fetch `data.json` while the file is missing or malformed, the page catches the error and shows a friendly message indicating that the data could not be loaded. If the user loses internet connectivity during any API call, the fetch request times out or rejects, and the UI displays a notification asking the user to check their connection and retry. All errors are handled inline so the user never sees a blank page or a generic browser error.

## Conclusion and Overall App Journey

In summary, a new user arrives at the application and either signs up or signs in. Successful authentication sets a secure session and redirects the user to the dashboard. The dashboard layout provides a sidebar and header for seamless navigation. Core data visualizations come from a static JSON file, and developers can extend these with real API calls or additional pages. Users sign out via the header and can return to sign-in to start a new session. Error messages throughout the app guide the user when something goes wrong, ensuring a smooth and continuous journey from first visit to daily dashboard use.