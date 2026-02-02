import { AuthenticateWithRedirectCallback, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** SessionStorage key: set when auth completes so ProtectedRoute knows to wait for Clerk hydration */
const AUTH_JUST_COMPLETED_KEY = "clerk_auth_just_completed";

/**
 * Renders at /auth-callback — the redirectUrl for OAuth (e.g. X/Twitter).
 * Completes the sign-in and redirects to dashboard.
 */
function AuthCallback() {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Define the destination
  const dashboardUrl = "/dashboard";

  // Set flag on mount—we only land here during OAuth flow, so ProtectedRoute knows to wait for hydration
  useEffect(() => {
    sessionStorage.setItem(AUTH_JUST_COMPLETED_KEY, Date.now().toString());
    return () => {}; // Keep flag until ProtectedRoute clears it or it expires
  }, []);

  useEffect(() => {
    // If Clerk has finished loading and we are signed in,
    // ensure we clear any "custom" login data to prevent hybrid conflicts.
    if (isLoaded && isSignedIn) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000004] text-white">
      <div className="relative flex flex-col items-center gap-6">
        {/* The core Clerk logic handler */}
        <AuthenticateWithRedirectCallback
          signInForceRedirectUrl={dashboardUrl}
          signUpForceRedirectUrl={dashboardUrl}
          continueSignUpUrl={dashboardUrl}
        />

        {/* Visual feedback for the user while the handshake completes */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          
          <div className="text-center space-y-2">
            <p className="text-white font-bold font-mono uppercase tracking-[0.3em] text-sm">
              Authenticating
            </p>
            <p className="text-bodyTextDim text-[10px] uppercase tracking-widest font-mono animate-pulse">
              Finalizing secure connection to the network...
            </p>
          </div>
        </div>

        {/* Decorative elements to match your dashboard style */}
        <div className="absolute -inset-20 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary blur-[100px]"></div>
        </div>
      </div>

      <button 
        onClick={() => navigate("/login")}
        className="absolute bottom-12 text-bodyTextDim hover:text-white text-[10px] uppercase tracking-tighter transition-colors underline underline-offset-4"
      >
        Cancel and return to login
      </button>
    </div>
  );
}

export default AuthCallback;