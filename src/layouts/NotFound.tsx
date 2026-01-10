import GridBackground from "./Prelaunch/components/GridBackground";
import { logo, bgMain } from "../assets/images";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#000004] min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center px-[7vw]">
      {/* Structural Decorative Side Borders */}
      <div
        className="w-[7vw] border-r-2 border-borderColor z-[50] absolute left-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
        style={{ backgroundImage: `url(${bgMain})` }}
      ></div>
      <div
        className="border-l-2 border-borderColor w-[7vw] absolute z-[50] right-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
        style={{ backgroundImage: `url(${bgMain})` }}
      ></div>

      {/* Grid Background Layer */}
      <div className="absolute inset-0 opacity-40">
        <GridBackground />
      </div>

      {/* Animated Star Field (Persistent from your Hero) */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: "15%", left: "20vw", delay: "0.8s", size: "w-2 h-2" },
          { top: "60%", left: "80vw", delay: "1.5s", size: "w-1.5 h-1.5" },
          { top: "80%", left: "10vw", delay: "2.2s", size: "w-3 h-3" },
          { top: "10%", left: "70vw", delay: "0.3s", size: "w-1 h-1" },
        ].map((star, idx) => (
          <div
            key={idx}
            className="absolute animate-pulse-stars"
            style={{ top: star.top, left: star.left, animationDelay: star.delay }}
          >
            <div className={`relative ${star.size}`}>
              <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-80"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-70"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Error Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[800px] animate-fade-in">
        <div className="relative mb-8">
          <img src={logo} alt="logo" className="size-[100px] opacity-20 grayscale absolute -top-10 left-1/2 -translate-x-1/2 blur-sm" />
          <h1 className="font-panchang text-white text-[12vw] md:text-[150px] leading-none font-black tracking-tighter opacity-90">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-primary/30 blur-md"></div>
        </div>

        <div className="flex flex-col gap-2 -mt-4 md:-mt-8">
          <h2 className="text-primary uppercase tracking-[0.3em] font-bold text-sm md:text-xl">
            Signal Lost in the Perimeter
          </h2>
          
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-[1px] w-12 bg-borderColor"></div>
            <p className="font-mono text-bodyTextDim text-[10px] md:text-xs uppercase tracking-[0.5em]">
              Navigation Error: Page Not Found
            </p>
            <div className="h-[1px] w-12 bg-borderColor"></div>
          </div>

          <p className="font-extralight text-bodyTextDim max-w-md mx-auto leading-relaxed text-sm md:text-base">
            The data coordinates you requested do not exist within the JBLB network. 
            The session has been terminated or moved to a different sector.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-12 group relative px-8 py-4 bg-transparent border border-primary/50 overflow-hidden transition-all hover:border-primary"
        >
          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <span className="relative z-10 text-primary font-bold uppercase tracking-[0.2em] text-xs">
            Return to Command Center
          </span>
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
        </button>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes pulse-stars {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-stars {
          animation: pulse-stars 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default NotFound;