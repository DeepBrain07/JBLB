import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

const dashboardUrl = import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL || "/dashboard";

/**
 * Renders at /auth-callback — the redirectUrl for OAuth (e.g. X/Twitter).
 * Completes the sign-in and redirects to redirectUrlComplete (dashboard).
 */
function AuthCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000004] text-white">
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl={dashboardUrl}
      />
      <p className="absolute bottom-8 text-bodyTextDim text-xs uppercase tracking-widest font-mono">
        Completing authorization…
      </p>
    </div>
  );
}

export default AuthCallback;
