import { waitlistFormBgAlt } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignInForm = () => {
  const navigate = useNavigate();

  // Updated endpoint to use the Vite proxy path
  const ENDPOINT = "/api/users/login/"; 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Invalid credentials. access denied.");
      }

      // 1. Set Success Feedback
      setSuccessMsg("ACCESS GRANTED. INITIALIZING DASHBOARD...");

      // 2. Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/waitlist/dashboard");
      }, 2000);

    } catch (error: any) {
      setErrorMsg(error.message || "Failed to authorize access.");
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
            disabled={!!successMsg}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none focus:border-primary transition-colors uppercase text-xs tracking-widest disabled:opacity-50"
          />

          <input
            type="password"
            placeholder="ENTER PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!!successMsg}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none focus:border-primary transition-colors uppercase text-xs tracking-widest disabled:opacity-50"
          />

          {/* Success Message Area */}
          {successMsg && (
            <div className="animate-pulse py-2">
              <p className="text-primary text-sm font-bold font-mono uppercase tracking-[0.2em] text-center">
                {successMsg}
              </p>
            </div>
          )}

          {/* Error Message Area */}
          {errorMsg && (
            <p className="text-red-500 text-sm font-mono uppercase tracking-widest text-center">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col gap-2 mt-2">
            {!successMsg && (
              <>
                <p className="text-xs tracking-widest text-bodyTextDim uppercase text-center">
                  New to the network?{" "}
                  <span 
                    onClick={() => navigate("/register")} 
                    className="text-primary cursor-pointer hover:underline underline-offset-4"
                  >
                    Register
                  </span>
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#A9EF2E] text-black font-bold py-4 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                >
                  {loading ? "VERIFYING..." : "AUTHORIZE ACCESS"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};