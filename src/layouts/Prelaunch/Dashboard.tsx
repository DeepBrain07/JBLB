import { Icon } from "@iconify/react/dist/iconify.js";
import { avatar, bgMain } from "../../assets/images/index.ts";
import { Footer } from "./components/Footer.tsx";
import { useState, useEffect } from "react";
import { useSyncUserToBackend } from "@/hooks/useSyncUserToBackend";
import "./dashboard.css";
import WaitlistTable from "./components/WaitlistTable.tsx";
import Leaderboard from "./components/Leaderboard.tsx";
import EmailInviteSection from "./components/EmailInviteSection.tsx";
import { useAuth, useUser } from "@clerk/clerk-react";
import { BACKEND_USER_DATA_KEY } from "@/services/authApi";

const steps = [
  {
    title: "Share Your Unique Link",
    description: "Your personal referral code is baked into this link. Share it anywhere—Twitter, Discord, or directly with friends.",
  },
  {
    title: "They Join the Waitlist",
    description: "Your friends sign up using your link. They get all the same early benefits, and you both move up the priority list.",
  },
];

const Dashboard = () => {
  useSyncUserToBackend();

  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [savedUserData, setSavedUserData] = useState<any>(() => {
    try {
      const cached = localStorage.getItem(BACKEND_USER_DATA_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        setLoading(true);
        const currentCached = JSON.parse(localStorage.getItem(BACKEND_USER_DATA_KEY) || "{}");
        const token = currentCached?.access_token || localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/referrals/dashboard/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const freshData = await response.json();
          // freshData contains the latest 'waitlist_position'
          setDashboardData(freshData);
          setSavedUserData(freshData);
          localStorage.setItem(BACKEND_USER_DATA_KEY, JSON.stringify(freshData));
        }
      } catch (error) {
        console.error("❌ Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [isLoaded, isSignedIn]);

  // --- MAPPING LOGIC ---
  // We prioritize dashboardData (freshData) over savedUserData (cache)
  const username = dashboardData?.username || savedUserData?.username || user?.username || "founder";
  const referralLink = dashboardData?.referral_link || savedUserData?.referral_link || "https://yieldsport.xyz/waitlist?ref=...";
  const userEarnings = dashboardData?.earnings || savedUserData?.earnings || "0.0000";
  const totalRefs = dashboardData?.total_referrals || savedUserData?.total_referrals || 0;
  
  // FIX: Explicitly using waitlist_position for the ranking
  const globalPosition = dashboardData?.waitlist_position ?? savedUserData?.waitlist_position ?? null;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading && !dashboardData && !savedUserData) {
    return (
      <div className="min-h-screen bg-[#000004] flex items-center justify-center text-primary font-mono text-xs uppercase tracking-[0.5em]">
        <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
           <p className="animate-pulse">Accessing Secure Node...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000004] absolute px-[7vw] fit w-full opacity-100 bg-center text-white flex flex-col items-center pb-40 min-h-screen overflow-x-hidden">
      <div className="w-[7vw] border-r-2 border-borderColor z-[50] absolute left-0 top-0 h-full opacity-70 bg-repeat-y bg-top" style={{ backgroundImage: `url(${bgMain})` }}></div>
      <div className="border-l-2 border-borderColor w-[7vw] absolute z-[50] right-0 top-0 h-full opacity-70 bg-repeat-y bg-top" style={{ backgroundImage: `url(${bgMain})` }}></div>
      
      <Footer />

      <div className="p-2 py-14 w-full flex items-start flex-col gap-24 relative z-[60]">
        {/* Profile Header */}
        <div className="text-bodyTextDim gap-6 flex items-center">
          <img
            src={user?.imageUrl || avatar}
            alt="avatar"
            className="rounded-full min-w-[100px] max-w-[100px] w-[17vw] object-cover border-2 border-borderColor shadow-[0_0_15px_rgba(169,239,46,0.2)]"
          />
          <div className="flex flex-col gap-1">
            <p className="uppercase text-[10px] tracking-widest text-primary font-bold">Protocol Connection: Verified</p>
            <div className="flex flex-wrap gap-2 items-center">
              <p className="font-extrabold text-white !text-xl sm:!text-2xl">
                @{username}
              </p>
              <p className="font-normal w-fit h-fit !text-[10px] bg-primary/20 border border-primary px-2 py-0.5 text-primary uppercase">
                {totalRefs > 0 ? "Active Recruiter" : "Early Access"}
              </p>
            </div>
          </div>
        </div>

        {/* Global Rank is now powered by waitlist_position from freshData */}
        <div className="flex flex-wrap justify-center items-start gap-4 w-full">
          <Card title="JB Earnings" content={`${userEarnings} JB`} referral={true}/>
          <Card 
            title="Global Rank" 
            content={globalPosition !== null ? `#${globalPosition}` : "---"} 
          />
          <Card title="Direct Invites" content={totalRefs.toString()} />
        </div>

        {/* Info and Table Sections */}
        <div className="text-bodyTextDim flex flex-col gap-8 md:gap-[2%] md:flex-row w-full">
          <div className="p-6 w-full md:w-[49%] flex flex-col bg-bgColor border border-borderColor">
            <h2 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-borderColor pb-2">Referral Protocol</h2>
            <div className="flex flex-col gap-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex justify-center items-center size-6 shrink-0 text-black bg-primary font-bold text-xs">{idx + 1}</div>
                  <div>
                    <p className="text-white font-bold text-sm">{step.title}</p>
                    <p className="text-xs">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 w-full md:w-[49%] flex flex-col bg-bgColor border border-borderColor">
            <h2 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-borderColor pb-2">Broadcast Link</h2>
            <EmailInviteSection referralLink={referralLink} />
            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-widest mb-2 opacity-60">Personal Transmission URL</p>
              <div className="flex gap-4 justify-between items-center py-4 px-4 border border-borderColor bg-black/40 group hover:border-primary/50 transition-all">
                <p className="truncate text-xs font-mono">{referralLink}</p>
                <Icon
                  icon="ph:copy-bold"
                  className="size-5 cursor-pointer text-white hover:text-primary transition-colors"
                  onClick={handleCopy}
                />
              </div>
              {copied && <p className="text-primary text-[10px] mt-2 font-bold tracking-widest text-right animate-pulse">COPY SUCCESSFUL</p>}
            </div>
          </div>
        </div>

        <div className="w-full space-y-20">
          <div className="w-full">
            <h2 className="mb-6 font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-white text-lg">
              <Icon icon="ph:users-four-duotone" className="text-primary" /> Network Roster
            </h2>
            <WaitlistTable data={dashboardData?.referral_network || []} />
          </div>
          <div className="w-full">
            <h2 className="mb-6 font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-white text-lg">
              <Icon icon="ph:chart-bar-duotone" className="text-primary" /> Global Leaderboard
            </h2>
            <Leaderboard data={dashboardData?.leaderboard || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, content, referral }: any) => (
  <div className="flex flex-col gap-4 p-6 text-bodyTextDim border border-borderColor w-full sm:w-[31%] min-w-[280px] h-[140px] shadow-xl bg-[#0a0a0a] hover:bg-[#111111] transition-all">
    <div className="flex justify-between items-center">
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">{title}</p>
      {referral && <Icon icon="ph:info-duotone" className="size-4 hover:text-primary cursor-pointer" />}
    </div>
    <p className="text-white text-4xl font-black font-mono tracking-tighter">{content}</p>
  </div>
);

export default Dashboard;