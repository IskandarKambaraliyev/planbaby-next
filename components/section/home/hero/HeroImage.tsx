import { cn } from "@/lib/utils";

import type { PropsWithClassName } from "@/types";
import Image from "next/image";

const HeroImage = ({ className }: PropsWithClassName) => {
  return (
    <Image
      src="/home-hero-image-min.svg"
      alt="Hero Image"
      className={cn("max-w-full h-auto mx-auto", className)}
      width={500}
      height={437}
      priority
    />
  );
};

export default HeroImage;
