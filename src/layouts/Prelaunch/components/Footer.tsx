import { Icon } from "@iconify/react/dist/iconify.js";

export const Footer = () => {
  

  return (
      <div className="absolute bottom-0 w-full text-bodyText/50 flex flex-col sm:flex-row justify-center items-center flex-wrap gap-4  pb-2">
        <p className="whitespace-nowrap">© 2025 JBLB • All rights reserved.</p>

        <div className="flex gap-2">
          {/* <div className="p-2 bg-bgColor hover-pointer">
            <Icon icon="ic:baseline-discord" className="size-6 text-white" />
          </div> */}
          <div className="p-2 bg-bgColor hover-pointer" onClick={() => window.open("https://x.com/jblbGeng", "_blank")}>
            <Icon icon="prime:twitter" className="size-6 text-white" />
          </div>
          <div className="p-2 bg-bgColor hover-pointer" onClick={() => window.open("https://t.me/jblbplayers", "_blank")}>
            <Icon icon="file-icons:telegram" className="size-6 text-white" />
          </div>
        </div>
      </div>
  );
};
