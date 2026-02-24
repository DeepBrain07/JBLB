import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ProviderRouter } from "./routers/provider.router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ClerkProvider } from "@clerk/clerk-react";

// 1. Always use the variable from .env to avoid mismatch
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Log it once to ensure Vite is actually reading the .env file
console.log("CLERK KEY ATTEMPT:", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Check your .env file!");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        // These props are critical for Clerk to synchronize the session after the redirect
        // afterSignInUrl="/dashboard"
        // afterSignUpUrl="/dashboard"
        // signInUrl="/signin"
        // signUpUrl="/signup"
      >
        <RouterProvider router={ProviderRouter} />
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);