import { useAuth, useSession } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

/** AuthCallback sets this when user lands there during OAuth flow */
const AUTH_JUST_COMPLETED_KEY = "clerk_auth_just_completed";
const AUTH_JUST_COMPLETED_MAX_AGE_MS = 30000; // 30s — flag expires after this

/** Grace period (ms) before redirecting when NOT coming from OAuth */
const NORMAL_GRACE_MS = 3000;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useSession();
  const location = useLocation();
  const [graceOver, setGraceOver] = useState(false);
  const [giveUp, setGiveUp] = useState(false);

  // Added console.log to check isSignedIn status
  console.log("ProtectedRoute - isLoaded:", isLoaded, "isSignedIn:", isSignedIn);

  const customUser = localStorage.getItem("user");

  // Coming from OAuth: AuthCallback sets the flag. Don't auto-redirect — wait for Clerk.
  const authJustCompleted = typeof window !== "undefined" ? sessionStorage.getItem(AUTH_JUST_COMPLETED_KEY) : null;
  const flagTime = authJustCompleted ? parseInt(authJustCompleted, 10) : 0;
  const flagAge = Date.now() - flagTime;
  const fromOAuth = flagAge >= 0 && flagAge < AUTH_JUST_COMPLETED_MAX_AGE_MS;

  useEffect(() => {
    if (isSignedIn) {
      sessionStorage.removeItem(AUTH_JUST_COMPLETED_KEY);
      setGraceOver(true);
      return;
    }
    if (!isLoaded) return;
    // From OAuth: never auto-redirect; wait for isSignedIn. User can click "Return to login".
    if (fromOAuth) return;

    const timer = setTimeout(() => setGraceOver(true), NORMAL_GRACE_MS);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, fromOAuth]);

  if (customUser) return <>{children}</>;

  // Loading: Clerk not ready, or waiting for Clerk after OAuth
  const stillWaiting = !isLoaded || (isLoaded && !isSignedIn && !graceOver && !giveUp);
  if (stillWaiting && !(fromOAuth && giveUp)) {
    return (
      <div className="min-h-screen bg-[#000004] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <div className="text-center space-y-2">
          <p className="text-primary animate-pulse uppercase tracking-[0.3em] text-[10px] font-mono">
            Syncing Security Credentials...
          </p>
          <p className="text-white/20 text-[9px] uppercase font-mono italic">
            Finalizing handshake with X-Auth provider
          </p>
        </div>
        {fromOAuth && (
          <button
            onClick={() => {
              sessionStorage.removeItem(AUTH_JUST_COMPLETED_KEY);
              setGiveUp(true);
            }}
            className="mt-8 text-bodyTextDim hover:text-white text-[10px] uppercase underline underline-offset-4"
          >
            Return to login
          </button>
        )}
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;