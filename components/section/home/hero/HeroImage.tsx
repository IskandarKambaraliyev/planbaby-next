import { proxyImage } from "@/lib/proxyImage";
import { cn } from "@/lib/utils";

import type { PropsWithClassName } from "@/types";

const HeroImage = ({ className }: PropsWithClassName) => {
  return (
    <img
      src={proxyImage("/home-hero-image-min.svg")}
      alt="Hero Image"
      className={cn("max-w-full h-auto mx-auto", className)}
      width={500}
      height={437}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
};

export default HeroImage;
