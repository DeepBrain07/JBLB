import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ProviderRouter } from "./routers/provider.router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("CLERK KEY CHECK:", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key.");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        // 1. Ensure Clerk knows exactly where to go after auth
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
        afterSignOutUrl="/"
      >
        <RouterProvider router={ProviderRouter} />
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);