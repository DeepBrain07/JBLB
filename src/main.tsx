import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ProviderRouter } from "./routers/provider.router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ClerkProvider } from "@clerk/clerk-react"; // Import Clerk

// Fetch the key from your .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file.");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      {/* Wrap your router with ClerkProvider */}
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={ProviderRouter} />
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);