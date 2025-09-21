flowchart TD
    Home[User opens application]
    Home --> SignIn[Navigate to Sign In Page]
    Home --> SignUp[Navigate to Sign Up Page]
    SignIn --> SignInAPI[Submit Sign In Form]
    SignUp --> SignUpAPI[Submit Sign Up Form]
    SignInAPI --> AuthCheck{Is authentication successful}
    SignUpAPI --> AuthCheck
    AuthCheck -->|Yes| DashboardLayout[Load Dashboard Layout]
    DashboardLayout --> DashboardPage[Render Dashboard Page]
    DashboardPage --> LoadData[Fetch data from data json]
    AuthCheck -->|No| AuthError[Display authentication error]
    AuthError --> SignIn