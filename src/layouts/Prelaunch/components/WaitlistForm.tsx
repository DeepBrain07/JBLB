import { waitlistFormBgAlt } from "../../../assets/images";
import { useNavigate } from "react-router-dom";

export const WaitlistForm = () => {
  const navigate = useNavigate();
  return (
    <div
      className=" w-[80vw] bg-bgColor max-w-[600px] mx-auto bg-no-repeat bg-center bg-cover relative"
      style={{
        // backgroundImage: `url(${waitlistFormBgAlt})`,
        borderImage: `url(${waitlistFormBgAlt})`,
        borderImageWidth: "20px",
        borderImageSlice: 20,
        borderImageRepeat: "repeat",
      }}
    >
      <div className="p-6 flex flex-col gap-4">

        <form className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="ENTER X USERNAME"
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none"
          />

          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none"
          />

          <div
            // type="submit"
            onClick={() => navigate("/wishlist/congratulations")}
            className="w-full bg-[#A9EF2E] text-black font-semibold py-4 hover:opacity-90 transition"
          >
            JOIN WAITLIST
          </div>

        </form>


            </div>
    </div>
  );
};
