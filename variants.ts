import { Transition, Variants } from "motion/react";

export const dropdownVariants: Variants = {
  initial: { opacity: 0, y: -10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
};

export const dropdownTransition: Transition = {
  duration: 0.15,
};

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
