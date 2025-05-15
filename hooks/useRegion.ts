import { useEffect, useState } from "react";
import { RegionKey } from "@/types";
import { RegionKeySchema } from "@/schemas";

// Default fallback
const DEFAULT_REGION: RegionKey = "tash";

export function useRegion() {
  const [region, setRegion] = useState<RegionKey | null>(null);

  // Get region from localStorage after mount
  useEffect(() => {
    const stored = localStorage.getItem("region");
    const result = RegionKeySchema.safeParse(stored);
    setRegion(result.success ? result.data : DEFAULT_REGION);
  }, []);

  // Update region and save to localStorage
  const updateRegion = (newRegion: RegionKey) => {
    setRegion(newRegion);
    localStorage.setItem("region", newRegion);
  };

  return {
    region,
    setRegion: updateRegion,
  };
}
