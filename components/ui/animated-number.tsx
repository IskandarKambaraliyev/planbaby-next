"use client";

import { cn } from "@/lib/utils";
import { motion, SpringOptions, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>;
  style?: React.CSSProperties;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
  style,
}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString("ru-RU")
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const Component = as;

  return (
    <Component className={cn("tabular-nums", className)} style={style}>
      <motion.span style={{ display }}>
        {display}
      </motion.span>
    </Component>
  );
}
