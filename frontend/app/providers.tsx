"use client";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryclient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryclient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: 0,
            border: "1px solid black",
            fontSize: 12,
            fontWeight: 600,
          },
        }}
      />
    </QueryClientProvider>
  );
}
