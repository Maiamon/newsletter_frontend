import { createBrowserRouter } from "react-router";
import { SignIn } from "./components/pages/auth/sign-in";
import { Dashboard } from "./components/pages/app/Dashboard";
import { AppLayout } from "./components/pages/_layout/app";
import { AuthLayout } from "./components/pages/_layout/auth";
import { SignUp } from "./components/pages/auth/sign-up";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export const router = createBrowserRouter([

  { 
    path: "/", 
    element: <AppLayout />, 
    children: [
      { 
        path: "/", 
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/dashboard", 
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ) 
      }
    ]
  },
  
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> }
    ]
  }
])