import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import PrivateRoute from "./privateRoute";
import { PageLoader } from "../Ui/pageLoader";
import ErrorPage from "../pages/ErrorPage";

// ── Eagerly loaded (small, always needed) ────
import MainLayout from "../Components/MainLayout";
import AuthLayout from "../Components/AuthLayout";

// ── Lazy loaded ──────────────────────────────
const LandingPage      = lazy(() => import("../LandingPage/landingPage"));
const Login            = lazy(() => import("../pages/Login"));
const Signup           = lazy(() => import("../pages/signUp"));
const Dashboard        = lazy(() => import("../Components/dashboard"));
const Profile          = lazy(() => import("../pages/profile"));
const Notifications    = lazy(() => import("../Components/notification"));
const Settings         = lazy(() => import("../pages/settings"));
const PostJob          = lazy(() => import("../pages/postJobPage"));
const JobDetails       = lazy(() => import("../pages/JobDetails"));
const ApplicationForm  = lazy(() => import("../pages/ApplyForm"));
const Offers           = lazy(() => import("../pages/Offers"));
const UserDetail       = lazy(() => import("../pages/admin/userDetails"));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const AppRoutes = () => (
  <PrivateRoute>
    <MainLayout />
  </PrivateRoute>
);

const router = createBrowserRouter([
  // ── Public ──────────────────────────────────
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<PageLoader />}>
        <LandingPage />
      </Suspense>
    ),
  },

  // ── Auth ────────────────────────────────────
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    Component: AuthLayout,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login",  element: withSuspense(Login)  },
      { path: "signup", element: withSuspense(Signup) },
    ],
  },

  // ── Protected ───────────────────────────────
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <AppRoutes />,
    children: [
      { path: "dashboard",        element: withSuspense(Dashboard)        },
      { path: "profile",          element: withSuspense(Profile)          },
      { path: "profile/:id",      element: withSuspense(UserDetail) },
      { path: "user/:id",         element: withSuspense(UserDetail) },
      { path: "notifications",    element: withSuspense(Notifications)    },
      { path: "settings",         element: withSuspense(Settings)         },
      {
        path: "offers",
        element: (
          <PrivateRoute allowedRoles={["employer"]}>
            {withSuspense(Offers)}
          </PrivateRoute>
        ),
      },
      { path: "job/:id",          element: withSuspense(JobDetails)       },
      { path: "job/apply/:jobId", element: withSuspense(ApplicationForm)  },
      {
        path: "post",
        element: (
          <PrivateRoute allowedRoles={["employer"]}>
            {withSuspense(PostJob)}
          </PrivateRoute>
        ),
      },
    ],
  },

  // ── Catch-all ───────────────────────────────
  {
    path: "*",
    element: (
      <ErrorPage
        status={404}
        title="Page not found"
        message="That route does not exist in NaijaJobs yet."
      />
    ),
  },
]);

export default function RoutesConfig() {
  return <RouterProvider router={router} />;
}
