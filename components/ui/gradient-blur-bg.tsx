import { cn } from "@/lib/utils";
import { useState } from "react";

export const GradientBlurBg = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("min-h-screen w-full bg-[#030303] relative overflow-hidden", className)}>
      {/* Adapted for Dark Mode: Purple/Indigo Gradient Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px),
            radial-gradient(circle 800px at 100% 200px, rgba(139,92,246,0.15), transparent)
          `,
          backgroundSize: "96px 64px, 96px 64px, 100% 100%",
        }}
      />
      {children}
    </div>
  );
};
