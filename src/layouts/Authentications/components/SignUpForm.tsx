import { waitlistFormBgAlt } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignUpForm = () => {
  const navigate = useNavigate();

  const ENDPOINT = "/api/users/signup/"; 

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // New state for success feedback
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
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
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Registration failed.");
      }

      // 1. Show Congratulations message
      setSuccessMsg("CONGRATULATIONS! ACCOUNT CREATED SUCCESSFULLY.");

      // 2. Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong.");
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
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none disabled:opacity-50"
          />

          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!successMsg}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none disabled:opacity-50"
          />

          <input
            type="password"
            placeholder="ENTER PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!!successMsg}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none disabled:opacity-50"
          />

          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!!successMsg}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none disabled:opacity-50"
          />

          {/* Success Message */}
          {successMsg && (
            <div className="animate-pulse">
               <p className="text-primary text-sm font-bold font-mono uppercase tracking-[0.2em] text-center">
                {successMsg}
              </p>
              <p className="text-bodyTextDim text-[10px] text-center mt-1 uppercase">Redirecting to login...</p>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm font-mono uppercase tracking-widest text-center">{errorMsg}</p>
          )}

          <div className="flex flex-col gap-2 mt-2">
            {!successMsg && (
              <>
                <p className="text-xs tracking-widest text-bodyTextDim uppercase text-center">
                    Already registered?{" "}
                    <span 
                        onClick={() => navigate("/login")} 
                        className="text-primary cursor-pointer hover:underline underline-offset-4"
                    >
                        Login
                    </span>
                </p>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#A9EF2E] text-black font-bold py-4 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                >
                    {loading ? "PROCESSING..." : "SIGN UP"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};