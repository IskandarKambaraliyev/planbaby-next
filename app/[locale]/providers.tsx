"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import { Next13ProgressBar } from "next13-progressbar";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Next13ProgressBar
        height="4px"
        color="#005fdf"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </QueryClientProvider>
  );
}
