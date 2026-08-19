"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(11,13,20,0.9)",
            color: "#F5F7FF",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(12px)",
            fontFamily: "var(--font-body)",
            fontSize: "13.5px",
          },
          success: { iconTheme: { primary: "#B4FF6B", secondary: "#0B0D14" } },
          error: { iconTheme: { primary: "#FF3EA5", secondary: "#0B0D14" } },
        }}
      />
    </SessionProvider>
  );
}
