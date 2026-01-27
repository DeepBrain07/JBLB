import GridBackground from "./Prelaunch/components/GridBackground";
import { logo, bgMain } from "../assets/images";
import { Footer } from "./Prelaunch/components/Footer.tsx";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const protocols = [
    {
      title: "Identity Acquisition",
      content: "We collect your email address and X (Twitter) handle exclusively to establish your unique ID in the Yield League. No unauthorized personal metadata is extracted during the OAuth handshake."
    },
    {
      title: "Data Encryption",
      content: "All sensitive credentials are processed via Supabase GoTrue architecture and stored in protected PostgreSQL schemas. Your session is secured via stateless JWT tokens, ensuring your private keys never touch our logic layer."
    },
    {
      title: "Tracking & Monitoring",
      content: "JBLB utilizes minimal telemetry to monitor perimeter health and prevent sybil attacks. We do not sell your data to third-party advertisers. Your activity is your property."
    },
    {
      title: "Protocol Rights",
      content: "Users maintain the right to terminate their session and request data erasure from the 'auth.users' table at any time. Exit procedures can be initiated through our official support channels."
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
          { top: "25%", left: "15vw", delay: "0.5s", size: "w-2 h-2" },
          { top: "70%", left: "80vw", delay: "1.2s", size: "w-1.5 h-1.5" },
          { top: "40%", left: "10vw", delay: "2.5s", size: "w-3 h-3" },
          { top: "85%", left: "70vw", delay: "0.1s", size: "w-1 h-1" },
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
        <div className="flex flex-col items-start mb-20">
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="logo" className="size-10" />
            <div className="h-[1px] w-12 bg-primary"></div>
            <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase">
              Privacy Protocol v1.0
            </span>
          </div>
          <h1 className="font-panchang text-white text-4xl md:text-6xl font-black uppercase tracking-tight">
            Data <br />
            <span className="text-primary drop-shadow-[0_0_15px_rgba(169,239,46,0.3)]">
              Privacy
            </span>
          </h1>
          <p className="text-bodyTextDim font-mono text-[10px] mt-4 tracking-[0.2em] uppercase">
            Status: Encrypted // Visibility: Restricted
          </p>
        </div>

        {/* Protocol Stack */}
        <div className="flex flex-col gap-6">
          {protocols.map((protocol, index) => (
            <div 
              key={index} 
              className="group flex flex-col md:flex-row gap-6 p-8 bg-bgColor/40 border-l-2 border-borderColor hover:border-primary transition-all duration-500 backdrop-blur-sm"
            >
              <div className="font-mono text-primary text-xs tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity pt-1">
                [0{index + 1}]
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-white font-bold uppercase tracking-[0.2em] text-lg">
                  {protocol.title}
                </h3>
                <p className="text-bodyTextDim text-sm leading-relaxed font-extralight uppercase tracking-widest max-w-2xl">
                  {protocol.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-24 flex flex-col items-center">
          <button
            onClick={() => navigate(-1)}
            className="group relative px-12 py-5 bg-transparent border border-borderColor/50 overflow-hidden transition-all hover:border-primary"
          >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <span className="relative z-10 text-white group-hover:text-primary font-bold uppercase tracking-[0.4em] text-[10px] transition-colors">
              Return to Command Center
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

export default PrivacyPolicy;