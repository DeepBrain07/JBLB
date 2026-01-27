import { createBrowserRouter } from "react-router-dom";

// Layouts / Pages
import Prelaunch from "../layouts/Prelaunch/Pralaunch";
import Congratulations from "../layouts/Prelaunch/Congratulations";
import Dashboard from "../layouts/Prelaunch/Dashboard";
import SignUp from "../layouts/Authentications/SignUp";
import SignIn from "../layouts/Authentications/SignIn";
import NotFound from "../layouts/NotFound";
import TermsOfService from "../layouts/TermsOfService";
import PrivacyPolicy from "@/layouts/PrivacyPolicy";

// DeFi Hub
import { DeFiHubLayout } from "../layouts/DeFiHub/DeFiHubLayout";
import { HubHome } from "../layouts/DeFiHub/HubHome";
import { BlockchainDetail } from "../layouts/DeFiHub/BlockchainDetail";
import { ProtocolDetail } from "../layouts/DeFiHub/ProtocolDetail";

// Error Handling
import { RouteErrorDisplay } from "../components/ErrorBoundary";

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
  TermsOfService: "/terms-of-service",
  PrivacyPolicy: "/privacy-policy",
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
    errorElement: <RouteErrorDisplay />,
  },

  {
    path: ProviderRoutePaths.WaitlistCongratulations,
    Component: Congratulations,
    errorElement: <RouteErrorDisplay />,
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
    path: ProviderRoutePaths.TermsOfService,
    Component: TermsOfService,
  },
  {
    path: ProviderRoutePaths.PrivacyPolicy,
    Component: PrivacyPolicy,
  },
  {
    path: ProviderRoutePaths.WaitlistDashboard,
    Component: Dashboard,
    errorElement: <RouteErrorDisplay />,
  },

  {
    path: "/hub",
    Component: DeFiHubLayout,
    errorElement: <RouteErrorDisplay />,
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