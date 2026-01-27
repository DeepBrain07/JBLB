import GridBackground from "./Prelaunch/components/GridBackground";
import { logo, bgMain } from "../assets/images";
import { Footer } from "./Prelaunch/components/Footer.tsx";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "01",
      title: "Service Authorization",
      content: "By engaging with the JBLB platform, you are granted a limited, non-exclusive license to access the YieldSport™ ecosystem. Unauthorized breach of the perimeter or reverse engineering of protocol logic is strictly prohibited."
    },
    {
      id: "02",
      title: "Identity & Verification",
      content: "Users are responsible for maintaining the security of their synchronized sessions. JBLB utilizes GoTrue and OAuth 2.0 protocols to verify identity via X (Twitter); any compromise of external accounts is the user's sole responsibility."
    },
    {
      id: "03",
      title: "Yield & Referral Policy",
      content: "The Referral Network is designed for organic growth. JSparks and future $JB distributions are subject to the Integrity Protocol. Accounts found utilizing sybil attacks or automated registration will be blacklisted from the sector."
    },
    {
      id: "04",
      title: "Protocol Evolution",
      content: "JBLB is currently in a Prelaunch phase. We reserve the right to modify service parameters, recalibrate JSparks earning rates, or update the technical perimeter architecture to ensure the long-term stability of the YieldSport™ sport."
    }
  ];

  return (
    <div className="bg-[#000004] min-h-screen w-full relative overflow-x-hidden flex flex-col items-center px-[7vw]">
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

      <Footer />

      {/* Ambient Star Field */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: "15%", left: "20vw", delay: "0.8s", size: "w-2 h-2" },
          { top: "60%", left: "85vw", delay: "1.5s", size: "w-1.5 h-1.5" },
          { top: "80%", left: "15vw", delay: "2.2s", size: "w-3 h-3" },
          { top: "10%", left: "75vw", delay: "0.3s", size: "w-1 h-1" },
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

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[900px] mt-32 mb-40 animate-fade-in">
        
        {/* Page Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="logo" className="size-10" />
            <div className="h-[1px] w-12 bg-primary"></div>
            <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase">
              Operational Guidelines
            </span>
          </div>
          <h1 className="font-panchang text-white text-4xl md:text-6xl font-black uppercase tracking-tight">
            Terms of <br />
            <span className="text-primary drop-shadow-[0_0_15px_rgba(169,239,46,0.3)]">
              Service
            </span>
          </h1>
          <p className="text-bodyTextDim font-mono text-[10px] mt-4 tracking-[0.2em] uppercase">
            Effective Date: 2026.01.27 // Sector: Global
          </p>
        </div>

        {/* Legal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="group p-8 bg-bgColor/40 border border-borderColor hover:border-primary/40 transition-all duration-500 relative backdrop-blur-sm"
            >
              <span className="absolute top-4 right-6 font-mono text-primary/10 text-5xl font-black group-hover:text-primary/20 transition-colors">
                {section.id}
              </span>
              <h3 className="text-white font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                <div className="size-2 bg-primary shadow-[0_0_10px_#A9EF2E]"></div>
                {section.title}
              </h3>
              <p className="text-bodyTextDim text-sm leading-relaxed font-extralight uppercase tracking-wider">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="h-[1px] w-full max-w-[200px] bg-borderColor/30"></div>
          <button
            onClick={() => navigate(-1)}
            className="group relative px-12 py-5 bg-transparent border border-borderColor overflow-hidden transition-all hover:border-primary"
          >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <span className="relative z-10 text-white group-hover:text-primary font-bold uppercase tracking-[0.4em] text-[10px] transition-colors">
              Return to Sector
            </span>
            {/* Signature Primary Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse-stars {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
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

export default TermsOfService;