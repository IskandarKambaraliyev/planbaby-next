import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ProviderProps } from "react";

export function createMockRouter(): ProviderProps<AppRouterInstance> {
  return {
    value: {
      back: () => {},
      forward: () => {},
      refresh: () => {},
      push: (href: string) => {
        console.log(`Pushed to ${href}`);
      },
      replace: (href: string) => {
        console.log(`Replaced with ${href}`);
      },
      prefetch: (href: string) => {
        console.log(`Prefetched ${href}`);
      },
    },
  };
}
