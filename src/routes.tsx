import { createBrowserRouter } from "react-router";
import { SignIn } from "./components/pages/auth/sign-in";
import { Dashboard } from "./components/pages/app/Dashboard";
import { AppLayout } from "./components/pages/_layout/app";
import { AuthLayout } from "./components/pages/_layout/auth";
import { SignUp } from "./components/pages/auth/sign-up";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { NotFoundPage, ServerErrorPage, AccessDeniedPage } from "./components/error-pages";

export const router = createBrowserRouter([

  { 
    path: "/", 
    element: <AppLayout />, 
    errorElement: <ServerErrorPage />,
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
    errorElement: <ServerErrorPage />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> }
    ]
  },

  // Rotas de erro específicas
  { path: "/404", element: <NotFoundPage /> },
  { path: "/500", element: <ServerErrorPage /> },
  { path: "/403", element: <AccessDeniedPage /> },
  
  // Rota catch-all para 404
  { path: "*", element: <NotFoundPage /> }
])