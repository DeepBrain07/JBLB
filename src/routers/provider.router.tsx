import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts / Pages
import Prelaunch from "../layouts/Prelaunch/Pralaunch";
import Congratulations from "../layouts/Prelaunch/Congratulations";
import Dashboard from "../layouts/Prelaunch/Dashboard";
import ProtectedRoute from "../layouts/AuthLayout/ProtectedRoute";
import SignUp from "../layouts/Authentications/SignUp";
import SignIn from "../layouts/Authentications/SignIn";
import AuthCallback from "../layouts/Authentications/AuthCallback";
import NotFound from "../layouts/NotFound";
import TermsOfService from "../layouts/TermsOfService";
import PrivacyPolicy from "@/layouts/PrivacyPolicy";

// DeFi Hub
import { DeFiHubLayout } from "../layouts/DeFiHub/DeFiHubLayout";
import { HubHome } from "../layouts/DeFiHub/HubHome";
import { BlockchainDetail } from "../layouts/DeFiHub/BlockchainDetail";
import { ProtocolDetail } from "../layouts/DeFiHub/ProtocolDetail";

// Route paths
export const ProviderRoutePaths = {
  Root: "/",
  Index: "/dashboard",
  SignIn: "/login",
  SignUp: "/register",
  Provider: "/provider",
  User: "/user",
  ResetPassword: "/reset-password",
  AuthCallback: "/auth-callback",
  Waitlist: "/waitlist",
  WaitlistCongratulations: "/waitlist/congratulations",
  WaitlistDashboard: "/dashboard",
  TermsOfService: "/terms-of-service",
  PrivacyPolicy: "/privacy-policy",
  ErrorPage: "*",

  Dashboard: {
    Index: "/dashboard",
    Overview: "/dashboard/overview",
  },
};

export const ProviderRouter = createBrowserRouter([
  // REDIRECT: Root route "/" now redirects to "/waitlist"
  {
    path: ProviderRoutePaths.Root,
    element: <Navigate to={ProviderRoutePaths.Waitlist} replace />,
  },
  {
    path: ProviderRoutePaths.Waitlist,
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
    path: "/register",
    element: <Navigate to={ProviderRoutePaths.SignUp} replace />,
  },
  {
    path: ProviderRoutePaths.SignIn,
    Component: SignIn,
  },
  {
    path: ProviderRoutePaths.AuthCallback,
    Component: AuthCallback,
  },
  {
    path: ProviderRoutePaths.TermsOfService,
    Component: TermsOfService,
  },
  {
    path: ProviderRoutePaths.PrivacyPolicy,
    Component: PrivacyPolicy,
  },
  {
    path: ProviderRoutePaths.WaitlistDashboard,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/hub",
    Component: DeFiHubLayout,
    children: [
      {
        index: true,
        Component: HubHome,
      },
      {
        path: "blockchain/:id",
        Component: BlockchainDetail,
      },
      {
        path: "protocol/:id",
        Component: ProtocolDetail,
      },
    ],
  },

  // 404 Catch-all Route
  {
    path: ProviderRoutePaths.ErrorPage,
    Component: NotFound,
  },
]);