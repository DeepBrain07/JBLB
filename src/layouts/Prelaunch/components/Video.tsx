import { Icon } from "@iconify/react/dist/iconify.js";
import { playNowAlt } from "../../../assets/images";
import { useState } from "react";

const Video = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className=" border-t-1 border-borderColor py-20  relative flex justify-center w-full overflow-hidden">
      
      {/* Stars animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] left-[30vw] animate-pulse-stars"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 bg-[#A9EF2E] blur-[0.5px] opacity-70"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-60"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-60"></div>
            <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#A9EF2E]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex justify-center items-center h-fit">
        <div className="flex flex-col gap-2 bg-bgColor md:w-[60vw] max-w-[600px] p-4">
          <div className="flex items-start gap-1">
            <Icon icon="material-symbols:square" className="size-3 text-primary" />
            <Icon icon="material-symbols:square" className="size-3 text-primary" />
            <Icon icon="material-symbols:square" className="size-3 text-primary" />
          </div>
          {/* Video */}
          <div className="relative  h-[280px] bg-bgColor ">
      
            {/* Placeholder Icon */}
            {!isLoaded && (
              <div className="relative h-full w-full bg-borderColor flex flex-col items-center justify-center">
                <img src={playNowAlt} alt="play now" className="h-4 mx-4 relative left-14 bottom-2 "/>
                <div className=" top-[50px] inset-0 w-fit h-fit p-2 bg-bgColor opacity-60 text-white">
                  <Icon icon="ph:play-fill" width={30} className="" />
                </div>
              </div>
            )}

            <video
              src="https://assets.website-files.com/64a7f3f6f5f3f4e5b8e2d6c1/64c4f3e4f5f3f4e5b8e2d8a0_JBLB%20Teaser%20Video.mp4"
              autoPlay
              loop
              muted
              className="w-full h-auto"
              onLoadedData={() => setIsLoaded(true)}
            ></video>
          </div>
        </div>
      </div>

      {/* Animation CSS */}
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

export default Video;
