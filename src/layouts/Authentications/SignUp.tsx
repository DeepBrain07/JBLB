import { logo, bgMain } from "../../assets/images";
import { Footer } from "../Prelaunch/components/Footer.tsx";
import { SignUpForm } from "./components/SignUpForm.tsx";

const SignUp = () => {
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
          { top: "10%", left: "60vw", delay: "0.8s", size: 2 },
          { top: "20%", left: "40vw", delay: "1.5s", size: 1.5 },
          { top: "50%", left: "10vw", delay: "2.2s", size: 3 },
          { top: "70%", left: "25vw", delay: "0.3s", size: 1 },
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
        
        {/* Verbose High-End Header Section */}
        <div className="flex flex-col gap-4 animate-fade-in">
            <div className="relative inline-block mx-auto mb-4">
               <img src={logo} alt="Logo" className="size-14 relative z-10" />
               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            </div>
            
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.15em] leading-tight">
                Secure Your <br className="sm:hidden" />
                <span className="text-primary drop-shadow-[0_0_15px_rgba(169,239,46,0.5)]">
                    Registration
                </span>
              </h2>
              
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="h-[1px] w-8 bg-borderColor"></div>
                <p className="text-bodyTextDim text-xs sm:text-sm uppercase tracking-[0.4em] font-mono font-medium">
                    Initialize & View Your Dashboard
                </p>
                <div className="h-[1px] w-8 bg-borderColor"></div>
              </div>
            </div>

            <p className="text-bodyTextDim max-w-lg mx-auto text-xs sm:text-sm mt-2 leading-relaxed opacity-80 uppercase tracking-widest">
              Join the elite network and gain real-time access to your 
              <span className="text-white px-2">YieldSport™ Analytics</span> 
              and proprietary performance metrics.
            </p>
        </div>

        {/* Form Component */}
        <div className="w-full max-w-[550px] transition-all duration-500 hover:scale-[1.01]">
          <SignUpForm />
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

export default SignUp;