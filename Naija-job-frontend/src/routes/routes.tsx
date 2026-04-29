import PostJob from '../pages/postJobPage';
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from '../Components/MainLayout';
import JobDetails from '../pages/JobDetails';
import ApplicationForm from '../pages/ApplyForm';
import AuthLayout from '../Components/AuthLayout';
import LandingPage from '../LandingPage component/landingPage';
import Login from '../pages/Login';
import Profile from '../pages/profile';
import Dashboard from '../Components/dashboard';
import Signup from '../pages/signUp';
import PrivateRoute from './privateRoute';

const router = createBrowserRouter([
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/main",
        Component: LandingPage
      },
    ]
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: () => (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        Component: () => (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        Component: () => (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/signup",
        Component: Signup
      },
      {
        path: "post",
        Component: () => (
          <PrivateRoute allowedRoles={["employer"]}>
            <PostJob />
          </PrivateRoute>
        ),
      },
      {
        path: "job/:id",
        Component: () => (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "job/apply",
        Component: () => (
          <PrivateRoute>
            <ApplicationForm />
          </PrivateRoute>
        ),
      },
    ]
  }
]);

export default function RoutesConfig() {
  return <RouterProvider router={router} />;
}