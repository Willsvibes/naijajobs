import PostJob from "../pages/postJobPage";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import MainLayout from "../Components/MainLayout";
import JobDetails from "../pages/JobDetails";
import ApplicationForm from "../pages/ApplyForm";
import AuthLayout from "../Components/AuthLayout";
import LandingPage from "../LandingPage/landingPage";
import Login from "../pages/Login";
import Profile from "../pages/profile";
import Dashboard from "../Components/dashboard";
import Signup from "../pages/signUp";
import PrivateRoute from "./privateRoute";
import Notifications from "../Components/notification";
import Settings from "../pages/settings";
const AppRoutes = () => (
  <PrivateRoute>
    <MainLayout />
  </PrivateRoute>
);

const router = createBrowserRouter([
  // Public Landing Page
  {
    path: "/",
    element: <LandingPage />,
  },
  // Auth Group
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
  // Protected Application Group
  {
    path: "/",
    element: <AppRoutes />,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "profile", Component: Profile },
      { path: "notifications", Component: Notifications }, 
      { path: "settings", Component: Settings },
      {
        path: "post",
        element: (
          <PrivateRoute allowedRoles={["employer"]}>
            <PostJob />
          </PrivateRoute>
        ),
      },
      { path: "job/:id", Component: JobDetails },
      { path: "job/apply/:jobId", Component: ApplicationForm }, // 👈 fixed to include :jobId
    ],
  },
  // Catch-all
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function RoutesConfig() {
  return <RouterProvider router={router} />;
}