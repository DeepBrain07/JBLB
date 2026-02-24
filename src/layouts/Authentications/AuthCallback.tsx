import { AuthenticateWithRedirectCallback, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/** SessionStorage key: set when auth completes so ProtectedRoute knows to wait for Clerk hydration */
const AUTH_JUST_COMPLETED_KEY = "clerk_auth_just_completed";

function AuthCallback() {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Define the destination
  const dashboardUrl = "/dashboard";

  useEffect(() => {
    // DEBUG: Check if Twitter/X actually sent back the code
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    console.log("AuthCallback - URL Params present:", { hasCode: !!code, hasState: !!state });
    
    if (!code) {
      console.warn("No code found in URL. This callback might have been triggered manually or failed.");
    }

    sessionStorage.setItem(AUTH_JUST_COMPLETED_KEY, Date.now().toString());
  }, [searchParams]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("Clerk Handshake Complete. User is signed in.");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // Optional: Manual navigation if the component doesn't redirect automatically
      // navigate(dashboardUrl);
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000004] text-white">
      <div className="relative flex flex-col items-center gap-6">
        
        {/* The core Clerk logic handler. 
          Uncommenting these ensures Clerk knows where to push the user 
          once the network request finishes.
        */}
        <AuthenticateWithRedirectCallback
          signInForceRedirectUrl={dashboardUrl}
          signUpForceRedirectUrl={dashboardUrl}
          continueSignUpUrl={dashboardUrl}
        />

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