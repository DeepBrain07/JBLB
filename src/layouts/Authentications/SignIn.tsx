import { logo, bgMain } from "../../assets/images";
import { Footer } from "../Prelaunch/components/Footer.tsx";
import { SignInForm } from "./components/SignInForm.tsx";
import { useSignIn } from "@clerk/clerk-react";

const SignIn = () => {
  const { signIn, isLoaded } = useSignIn();

  // Reference your environment variables for strict redirect control
  // If these aren't in your .env yet, Clerk will use the defaults set in the dashboard
  // const _signInUrl = import.meta.env.VITE_CLERK_SIGN_IN_URL || "/signin";
  const dashboardUrl = import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL || "/dashboard";

  const handleXLogin = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_x",
        // The intermediate Clerk hand-off point
        redirectUrl: "/auth-callback", 
        // Where the user ends up after a successful handshake
        redirectUrlComplete: dashboardUrl,
      });
    } catch (error) {
      console.error("Clerk Authorization failed:", error);
    }
  };

  return (
    <div
      className="bg-[#000004] px-[7vw] absolute fit w-full opacity-100 bg-center text-white flex flex-col items-center pb-40 min-h-screen overflow-x-hidden"
    >
      {/* Structural Decorative Side Borders */}
      <div
        className="w-[7vw] border-r-2 border-borderColor z-[50] absolute left-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
        style={{ backgroundImage: `url(${bgMain})` }}
      ></div>
      <div
        className="border-l-2 border-borderColor w-[7vw] absolute z-[50] right-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
        style={{ backgroundImage: `url(${bgMain})` }}
      ></div>
      
      <Footer />

      {/* Ambient Star Field */}
      <div className="inset-0 pointer-events-none absolute h-full w-full">
        {[
          { top: "15%", left: "15vw", delay: "0.5s", size: 1.5 },
          { top: "10%", left: "60vw", delay: "0.8s", size: 2 },
          { top: "25%", left: "85vw", delay: "1.1s", size: 1 },
          { top: "50%", left: "10vw", delay: "2.2s", size: 3 },
          { top: "75%", left: "30vw", delay: "0.3s", size: 1.5 },
          { top: "85%", left: "80vw", delay: "1.2s", size: 2 },
        ].map((star, idx) => (
          <div
            key={idx}
            className="absolute animate-pulse-stars"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          >
            <div className={`relative w-${star.size} h-${star.size}`}>
              <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-80"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="flex gap-12 w-full mt-16 max-w-[850px] flex-col text-center items-center p-6 z-10 relative">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 animate-fade-in">
            <div className="relative inline-block mx-auto mb-4">
               <img src={logo} alt="Logo" className="size-14 relative z-10" />
               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            </div>
            
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.15em] leading-tight">
                Authorize <br className="sm:hidden" />
                <span className="text-primary drop-shadow-[0_0_15px_rgba(169,239,46,0.5)]">
                    Access
                </span>
              </h2>
              
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="h-[1px] w-8 bg-borderColor"></div>
                <p className="text-bodyTextDim text-xs sm:text-sm uppercase tracking-[0.4em] font-mono font-medium">
                    Identity Verification Required
                </p>
                <div className="h-[1px] w-8 bg-borderColor"></div>
              </div>
            </div>

            <p className="text-bodyTextDim max-w-lg mx-auto text-xs sm:text-sm mt-2 leading-relaxed opacity-80 uppercase tracking-widest">
              Welcome back to the secure perimeter. Enter your credentials to 
              <span className="text-white px-2">Synchronize Session</span> 
              and resume your dashboard monitoring.
            </p>
        </div>

        {/* Auth Interface */}
        <div className="px-4 w-full max-w-[400px]">
          {/* Ensure SignInForm is also updated to use Clerk hooks if it handles inputs */}
          <SignInForm />

          {/* Secure Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-borderColor opacity-20"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#000004] px-4 text-bodyTextDim tracking-[0.5em] font-mono">
                External Linkage
              </span>
            </div>
          </div>

          {/* X Login Button */}
          <button 
            onClick={handleXLogin}
            disabled={!isLoaded}
            className="w-full flex items-center justify-center gap-3 bg-white/[0.03] border border-borderColor/50 hover:border-primary hover:bg-white/[0.07] transition-all duration-500 py-4 rounded-none group relative overflow-hidden disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="relative z-10 group-hover:text-primary transition-colors duration-300">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="relative z-10 uppercase font-mono text-[11px] tracking-[0.3em] font-bold">
              Authorize 
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse-stars {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-stars {
          animation: pulse-stars 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SignIn;