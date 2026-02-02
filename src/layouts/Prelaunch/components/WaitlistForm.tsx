import { waitlistFormBgAlt } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const WaitlistForm = () => {
  const navigate = useNavigate();

  /**
   * By using the /api prefix, the Vite proxy configured in vite.config.ts
   * intercepts this request and forwards it to https://jblb-app.onrender.com
   */
  const ENDPOINT = "/api/waitlist/submit/";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      // Pass the dynamic data to the congratulations page
      navigate("/waitlist/congratulations", {
        state: {
          id: data?.your_id,
          referralLink: data?.your_referral_link,
          xUsername: username,
        },
      });
    } catch (error: any) {
      // Improved error logging to help debug proxy issues
      console.error("Submission Error:", error);
      setErrorMsg(error.message || "Failed to join waitlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className=" w-[80vw] bg-bgColor max-w-[600px] mx-auto bg-no-repeat bg-center bg-cover relative"
      style={{
        borderImage: `url(${waitlistFormBgAlt})`,
        borderImageWidth: "20px",
        borderImageSlice: 20,
        borderImageRepeat: "repeat",
      }}
    >
      <div className="p-6 flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="ENTER X USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none"
          />

          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none"
          />

          {errorMsg && (
            <p className="text-red-500 text-sm font-mono uppercase text-center">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-2">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] text-bodyTextDim uppercase text-center">
              Joined the list?{" "}
              <span
                onClick={() => navigate("/dashboard")}
                className="text-primary cursor-pointer hover:underline underline-offset-4 font-bold"
              >
                View dashboard
              </span>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A9EF2E] text-black font-bold py-4 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
            >
              {loading ? "PROCESSING..." : "JOIN WAITLIST"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};