import { logo, avatar } from "../../assets/images";
import { Button } from "../../components/ButtonAlt.tsx";
import { Footer } from "./components/Footer.tsx";
import { useState, useEffect } from "react";

const Congratulations = () => {
  const screenWidth = useScreenWidth();
  console.log(screenWidth)
  return (
    <div className="bg-[#000004] absolute fit w-full  opacity-100  bg-center text-white flex flex-col items-center  pb-40">
      <Footer />  
      <div className="  inset-0 pointer-events-none">
      {/* Star 1 */}
      <div
        className="absolute top-[10%] left-[60vw] animate-pulse-stars"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-80"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-[#A9EF2E]/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
        </div>
      </div>

      {/* Star 2 */}
      <div
        className="absolute top-[20%] left-[40vw] animate-pulse-stars"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="relative w-1.5 h-1.5">
          <div className="absolute inset-0 bg-[#A9EF2E] blur-[0.5px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#A9EF2E]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md"></div>
        </div>
      </div>

      {/* Star 3 */}
      <div
        className="absolute top-[50%] left-[10vw] animate-pulse-stars"
        style={{ animationDelay: "2.2s" }}
      >
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-90"></div>
          <div className="absolute top-1/2 left-1/2 w-5 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[1px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-5 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[1px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-[#A9EF2E]/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
        </div>
      </div>

      {/* Star 4 */}
      <div
        className="absolute top-[70%] left-[25vw] animate-pulse-stars"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="relative w-1 h-1">
          <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-2.5 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-2.5 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#A9EF2E]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md"></div>
        </div>
      </div>
    </div>
        <div className="flex gap-14 w-[80vw]  mt-4 max-w-[750px] flex-col text-center items-center  p-6">
          {/* logos */}
          <div className="w-full flex flex-col gap-2 justify-center">
            <img src={logo} alt="Logo" className="h-16" />
            <div className="flex w-full justify-end">
              <img src={logo} alt="Logo" className="h-10" />
            </div>
          </div>
          
          {/* content */}
          <div className="w-full ">
            <div
              className="bg-bgColor border-2 border-b border-dotted border-primary w-full p-[20px] -mt-8 flex flex-col py-20  gap-8 justify-center items-center"
              style={{
                clipPath: `polygon(
                  0% 0%,                           /* Top Left */
                  100% 0%,                          /* Top Right */
                  100% calc(100% - 50px),          /*   Right: vertical start of cut */
                  calc(100% - 8vw) 100%,          /* Bottom Right: horizontal end of cut */
                  8vw 100%,                       /* Bottom Left: horizontal start of cut */
                  0% calc(100% - 50px)             /* Bottom Left: vertical end of cut */
                )`,
              }}
            >
              {/* Avatar */}
              <div className="p-4 bg-primary/10 flex flex-col justify-center rounded-full">
                <img src={avatar} alt="avatar" className="p-4 bg-primary/20 rounded-full min-w-[100px] max-w-[200px] w-[20vw] mx-auto "/>
              </div>

              {/*  */}
              <div className="flex flex-col justify-between items-center">
                <h2>ALAO HERITAGE</h2>
                <p>ID NO: <span className="text-primary">JBLB-FOUNDER-2841</span></p>
              </div>
            </div>
            <div
              className="bg-bgColor p-[20px] pt-[50px] border-2 border-t-0 border-primary w-full h-[200px] flex flex-col justify-center items-center gap-1"
              style={{
                clipPath: `polygon(
                  8vw 0%,              /* Top Left: start on top edge */
                  calc(100% - 8vw) 0%, /* Top Right: end on top edge */
                  100% 50px,            /* Top Right: vertical drop */
                  100% 100%,            /* Bottom Right */
                  0% 100%,              /* Bottom Left */
                  0% 50px               /* Top Left: vertical start */
                )`,
              }}
            >
              <div className="flex justify-around w-full gap-1">
                {Array.from({ length: screenWidth }).map((_, i) => (
                  <div
                    key={i}
                    className={`${(i === 4 || i === screenWidth - 4) ? 'h-[70px]' : 'h-[50px]'} w-[0.8vw] bg-primary`}
                  />

                ))}
              </div>
              <div className="flex relative top-[-2] gap-2 flex-wrap justify-center items-center">
                <p className="text-bodyTextDim">Powered by JBLB</p>
                <img src={logo} alt="Logo" className="size-6"/>
              </div>
            </div>

              
            </div>            


          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Congratulations You're now <span className="text-primary">on the List!</span></h2>
            <p className="text-bodyTextDim"> <span className="text-white">Your spot is reserved.</span> You're now part of the <span className="text-white">inner circle</span> getting first access to the world's first YieldSport™.</p>
            <div className="flex justify-center gap-2 flex-wrap items-center ">
              <Button title="SHARE ON X" icon="prime:twitter" className="bg-primary text-black px-4 py-2 whitespace-nowrap"/>
              <Button title="DOWNLOAD" icon="material-symbols:download" className=" bg-bgColor text-white px-4 py-2"/>
            </div>
          </div>
        </div>
        {/* Animations */}
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

export const useScreenWidth = () => {
  const [width, setWidth] = useState(() =>
    Math.round(window.innerWidth / 10) / 2
  );

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const rounded = Math.round((Math.round(w / 10) / 2));
      setWidth(rounded);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default Congratulations;