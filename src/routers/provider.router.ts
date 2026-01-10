import { createBrowserRouter } from "react-router-dom";

// Layouts / Pages
import Prelaunch from "../layouts/Prelaunch/Pralaunch";
import Congratulations from "../layouts/Prelaunch/Congratulations";
import Dashboard from "../layouts/Prelaunch/Dashboard";
import SignUp from "../layouts/Authentications/SignUp";
import SignIn from "../layouts/Authentications/SignIn";
import NotFound from "../layouts/NotFound";

// Route paths
export const ProviderRoutePaths = {
  Root: "/",
  Index: "/dashboard",
  SignIn: "/login",
  SignUp: "/register",
  Provider: "/provider",
  User: "/user",
  ResetPassword: "/reset-password",
  WaitlistCongratulations: "/waitlist/congratulations",
  WaitlistDashboard: "/waitlist/dashboard",
  ErrorPage: "*", // This acts as the wildcard for unmatched routes

  Dashboard: {
    Index: "/dashboard",
    Overview: "/dashboard/overview",
  },
};

export const ProviderRouter = createBrowserRouter([
  {
    path: ProviderRoutePaths.Root,
    Component: Prelaunch,
  },

  {
    path: ProviderRoutePaths.WaitlistCongratulations,
    Component: Congratulations,
  },

  {
    path: ProviderRoutePaths.SignUp,
    Component: SignUp,
  },
  {
    path: ProviderRoutePaths.SignIn,
    Component: SignIn,
  },

  {
    path: ProviderRoutePaths.WaitlistDashboard,
    Component: Dashboard,
  },

  // 404 Catch-all Route
  {
    path: ProviderRoutePaths.ErrorPage,
    Component: NotFound,
  },
]);