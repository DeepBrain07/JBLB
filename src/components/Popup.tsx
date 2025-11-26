import React from "react";

interface PopupProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void; 
}

export const Popup = ({ children, isOpen, onClose }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 overflow-y-scroll h-svh inset-0 z-50 flex items-center justify-center"
    >
      {/* Blurry overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Popup content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};
