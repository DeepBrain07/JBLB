import { Icon } from "@iconify/react/dist/iconify.js";
import { avatar, bgMain } from "../../assets/images/index.ts";
import { Footer } from "./components/Footer.tsx";
import { useState,  } from "react";
// import { useSyncUserToBackend } from "@/hooks/useSyncUserToBackend";
import "./dashboard.css";
import WaitlistTable from "./components/WaitlistTable.tsx";
import Leaderboard from "./components/Leaderboard.tsx";
import EmailInviteSection from "./components/EmailInviteSection.tsx";
// import { useAuth, useSession } from "@clerk/clerk-react";

const steps = [
  {
    title: "Share Your Unique Link",
    description:
      "Your personal referral code is baked into this link. Share it anywhere—Twitter, Discord, or directly with friends.",
  },
  {
    title: "They Join the Waitlist",
    description:
      "Your friends sign up using your link. They get all the same early benefits, and you both move up the priority list.",
  },
];

const subSteps = [
  <>
    Immediate: You earn{" "}
    <span className="text-white">10 JSparks per referral</span>{" "}
    (convertible to $JB at launch).
  </>,
  <>
    At Launch: Every person who joined via your link becomes a{" "}
    <span className="text-white">founding member</span> of your club,
    generating passive income for you from day one.
  </>,
  <>
    Bonus: Climb the{" "}
    <span className="text-white">Referral Leaderboard</span>{" "}
    for additional NFT and token rewards.
  </>
];

const Dashboard = () => {
  // useSyncUserToBackend();
  // 2. Get getToken from Clerk
  // const { getToken, isSignedIn } = useSession(); 

  const [copied, setCopied] = useState(false);
  const [loading, _setLoading] = useState(true);
  const [dashboardData, _setDashboardData] = useState<any>(null);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       setLoading(true);
        
  //       // 3. Get the token (Clerk handles refreshing this for you)
  //       const token = await getToken();
  //       // 4. Also check your custom storage
  //       const customUser = JSON.parse(localStorage.getItem("user") || "null");
  //       const customToken = customUser?.access_token; // Adjust based on your API response

  //       const response = await fetch("referrals/dashboard", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // 5. Send whichever token exists
  //           "Authorization": `Bearer ${token || customToken}`,
  //         },
  //       });

  //       if (!response.ok) throw new Error("Failed to fetch dashboard data");
  //       const data = await response.json();
  //       setDashboardData(data);
  //     } catch (error) {
  //       console.error("Error fetching dashboard:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // Only fetch if we are actually signed in via one of the methods
  //   if (isSignedIn || localStorage.getItem("user")) {
  //     fetchDashboardData();
  //   }
  // }, [getToken, isSignedIn]); // Added dependencies

  const textToCopy = dashboardData?.your_referral_link || "[jblb.org/waitlist?ref=...]";

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000004] flex items-center justify-center text-primary">
        <p className="animate-pulse tracking-widest">LOADING DASHBOARD...</p>
      </div>
    );
  }

  return (
    <div
      className="bg-[#000004] absolute px-[7vw] fit w-full opacity-100 bg-center text-white flex flex-col items-center pb-40 min-h-screen overflow-x-hidden"
    >
      <div
        className="w-[7vw] border-r-2 border-borderColor z-[50] absolute left-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
        style={{ backgroundImage: `url(${bgMain})` }}
      ></div>
      <div
        className="border-l-2 border-borderColor w-[7vw] absolute z-[50] right-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
        style={{ backgroundImage: `url(${bgMain})` }}
      ></div>
      <Footer />

      <div className="inset-0 pointer-events-none">
        {[
          { top: "10%", left: "60vw", delay: "0.8s", size: 2 },
          { top: "20%", left: "80vw", delay: "1.5s", size: 1.5 },
          { top: "50%", left: "10vw", delay: "2.2s", size: 3 },
          { top: "70%", left: "25vw", delay: "0.3s", size: 1 },
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

      <div className="p-2 py-14 w-full flex items-start flex-col gap-24 ">
        {/* Profile */}
        <div className="text-bodyTextDim gap-4 flex items-center">
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full min-w-[100px] max-w-[100px] w-[17vw] mx-auto object-cover border-2 border-borderColor"
          />
          <div className="flex flex-col gap-1">
            <p>Welcome to your dashboard</p>
            <div className="flex flex-wrap gap-2 items-center">
              <p className="font-extrabold text-white !text-xl sm:!text-2xl">
                @{dashboardData?.username || "alomoguls"}
              </p>
              <p className=" font-normal w-fit h-fit !text-xs bg-primary/20 border-1 border-primary p-1 text-primary">
                EARLY ACCESS MEMBER
              </p>
            </div>
            <p className="font-mono text-sm">
              ID NO: <span className="text-primary">{dashboardData?.your_id || "JBLB-FOUNDER-2841"}</span>
            </p>
          </div>
        </div>

        {/* cards */}
        <div className="flex flex-wrap justify-center items-start gap-4">
          <Card title="Referral Earning" content={`${dashboardData?.referral_earnings || 0} JB`} referral={true}/>
          <Card title="Waitlist Position" content={dashboardData?.waitlist_position?.toLocaleString() || "2,451"} />
          <Card title="Total Referrals" content={dashboardData?.total_referrals?.toString() || "0"} />
        </div>

        {/* referal system and invite */}
        <div className="text-bodyTextDim flex flex-col gap-8 md:gap-[2%] md:flex-row w-full">
          <div className="p-4 w-full md:w-[49%] flex flex-col bg-bgColor border-1 border-borderColor gap-2">
            <h2 className="text-white">Referral System</h2>
            <p>Earn JSparks Now, Build Your Club's Founding Roster for Launch.</p>
            <div className="mt-2 flex flex-col gap-4">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex justify-center items-center size-6 shrink-0 text-black bg-primary">
                    <p>{index + 1}</p>
                  </div>
                  <div className="-mt-1">
                    <p className="text-white">{step.title}</p>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex flex-col gap-4">
                <div className="flex gap-4 items-start">
                  <div className="flex justify-center items-center size-6 shrink-0 text-black bg-primary">
                    <p>3</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-white">Earn and build your empire</p>
                    {subSteps.map((step, index) => (
                      <div key={index} className="-mt-1 flex items-center">
                        <Icon
                          icon="material-symbols-light:square"
                          className="size-5 text-borderColor shrink-0 inline-block mr-2 -mt-1"
                        />
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </div>
          
          <div className="p-4 w-full md:w-[49%] flex flex-col bg-bgColor border-1 border-borderColor gap-2">
            <h2 className="text-white">Invite by Email</h2>
            <p>Send a direct invitation to friends you think would excel in the Yield League.</p>
            <EmailInviteSection/>
            <div className="flex gap-4 justify-between items-center text-bodyTextDim py-4 px-2 border border-borderColor w-full bg-black/40">
              <p className="truncate text-xs sm:text-sm">{textToCopy}</p>
              <div className="relative">
                <Icon
                  icon="gg:copy"
                  className="size-5 cursor-pointer text-white shrink-0 inline-block mr-2 -mt-1 hover:text-primary transition-colors"
                  onClick={handleCopy}
                />
                {copied && (
                  <span className="absolute -top-10 right-0 text-[10px] bg-primary text-black font-bold px-2 py-1 rounded">
                    COPIED!
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <p>One-Click Share:</p>
              <div className="flex gap-2">
                <div className="p-2 bg-bgColor border-1 border-borderColor cursor-pointer hover:bg-white/5" onClick={() => window.open("https://x.com/jblbGeng", "_blank")}>
                  <Icon icon="prime:twitter" className="size-6 text-white" />
                </div>
                <div className="p-2 bg-bgColor border-1 border-borderColor cursor-pointer hover:bg-white/5" onClick={() => window.open("https://t.me/jblbplayers", "_blank")}>
                  <Icon icon="file-icons:telegram" className="size-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Network */}
        <div className="w-full">
          <h2 className="mb-4">👥 Your Referral Network</h2>
          <WaitlistTable />
        </div>

        {/* Leaderboard */}
        <div className="w-full">
          <h2 className="mb-4">🎯 Leaderboard (Top 10 Referrers)</h2>
          <Leaderboard />
        </div>
      </div>

      <style>{`
        @keyframes pulse-stars {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-pulse-stars {
          animation: pulse-stars 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

interface CardProps {
  title: string;
  content: string;
  referral?: boolean;
}

const Card = ({ title, content, referral }: CardProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      style={{
        background:
          "linear-gradient(97deg, rgba(15, 15, 15, 1) 0%, rgba(31, 31, 31, 1) 19%, rgba(169, 239, 46, 1) 100%)",
      }}
      className="flex flex-col gap-4 p-4 text-bodyTextDim border-t-2 w-[70vw] max-w-[350px] h-[120px] border border-borderColor shadow-lg"
    >
      <div className="flex gap-4 justify-between items-center">
        <p className="text-xs uppercase tracking-widest">{title}</p>
        {referral && (
          <div className="relative">
            {showInfo && (
              <div className="absolute bottom-full left-[-70px] mb-3 z-50">
                <div className="relative border left-[-10px] border-borderColor -mb-2 p-2 bg-bgColor whitespace-nowrap shadow-xl">
                  <p className="!text-[10px] uppercase font-bold text-primary">Earn 10JB per referral now.</p>
                  <div className="absolute left-1/2 top-full -translate-x-1/2">
                    <div className="w-[10px] h-[10px] -mt-1 bg-bgColor rotate-45 border-r border-b border-borderColor" />
                  </div>
                </div>
              </div>
            )}
            <Icon
              icon="material-symbols:info-outline"
              className="size-5 cursor-pointer hover:text-white transition-all duration-200"
              onClick={() => setShowInfo((prev) => !prev)}
            />
          </div>
        )}
      </div>
      <p className="text-white !text-3xl font-bold font-mono">{content}</p>
    </div>
  );
};

export default Dashboard;