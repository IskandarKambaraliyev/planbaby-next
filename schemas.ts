import { z } from "zod";

export const RegionKeySchema = z.enum([
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
]);
