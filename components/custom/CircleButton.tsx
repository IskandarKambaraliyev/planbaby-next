import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren &
  PropsWithClassName & {
    href?: string;
    disabled?: boolean;
    shadow?: boolean;
    type?: "button" | "submit" | "reset";
    size?: "md" | "lg" | "xl";
    color?: "transparent" | "white" | "white-transparent";
    target?: "_blank" | "_self" | "_parent" | "_top";
    onClick?: () => void;
  };

const CircleButton = ({
  children,
  href,
  className,
  disabled,
  shadow = false,
  type = "button",
  size = "lg",
  color = "transparent",
  target,
  onClick,
}: Props) => {
  const classes = cn(
    "rounded-full border border-dark-blue-200 text-foreground transition overflow-hidden flex-center",
    {
      "cursor-default bg-white text-dark-blue-400": disabled,
      "cursor-pointer active:shadow-none": !disabled,
      "size-9 text-sm": size === "md",
      "size-12 text-base": size === "lg",
      "size-14 text-lg": size === "xl",
      "shadow-400": shadow,
      "bg-transparent hover:bg-dark-blue-100 active:bg-dark-blue-200":
        color === "transparent",
      "bg-white hover:bg-[#F0F0F4] active:bg-[#E0E1E9]": color === "white",
      "bg-transparent hover:bg-white-100 border-white-200": color === "white-transparent",
    },
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${classes}`}
        target={target}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${classes}`}
    >
      {children}
    </button>
  );
};

export default CircleButton;
