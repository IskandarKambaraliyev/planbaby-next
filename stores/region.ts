// stores/useRegionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RegionKey } from "@/types";
import { RegionKeySchema } from "@/schemas";

// Default fallback
const DEFAULT_REGION: RegionKey = "tash";

interface RegionStore {
  region: RegionKey;
  setRegion: (newRegion: RegionKey) => void;
}

export const useRegionStore = create<RegionStore>()(
  persist(
    (set) => ({
      region: (() => {
        // On first run (during hydration), try reading from localStorage:
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("region");
          const result = RegionKeySchema.safeParse(stored);
          return result.success ? result.data : DEFAULT_REGION;
        }
        return DEFAULT_REGION;
      })(),
      setRegion: (newRegion: RegionKey) => {
        set({ region: newRegion });
      },
    }),
    {
      name: "region", // Key in localStorage
      partialize: (state) => ({ region: state.region }), // Only persist 'region'
    }
  )
);
