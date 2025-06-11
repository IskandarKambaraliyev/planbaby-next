import { z } from "zod";

export const regions = [
  "tash",
  "and",
  "bukh",
  "jiz",
  "kashk",
  "nav",
  "nam",
  "sam",
  "surkh",
  "sir",
  "tash_reg",
  "fer",
  "khor",
  "kar",
  "other",
] as const;

export const RegionKeySchema = z.enum(regions);
