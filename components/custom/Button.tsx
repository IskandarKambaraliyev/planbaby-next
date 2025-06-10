"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useState } from "react";
import { RightIcon } from "../icons";

type CommonProps = {
  className?: string;
  loading?: boolean;
  linkIcon?: boolean;
  outlined?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "pink" | "yellow" | "green" | "white" | "gray";
};

type ButtonOnlyProps = {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonProps;

type LinkOnlyProps = {
  href: string;
  type?: never;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonProps;

type Props = PropsWithChildren<ButtonOnlyProps | LinkOnlyProps>;

const Button = (props: Props) => {
  const {
    children,
    href,
    className,
    disabled,
    loading = false,
    linkIcon = false,
    type = "button",
    outlined = false,
    size = "xl",
    color = "blue",
    onClick,
    ...rest
  } = props;

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updatePosition = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isDisabled = disabled || loading;

  const disabledClasses = outlined
    ? `!bg-transparent !border-dark-blue-200 !text-dark-blue-400`
    : `!bg-dark-blue-200 !border-transparent !text-dark-blue-400`;

  const filledColorClasses = {
    blue: "bg-blue-main text-white border-blue-main hover:text-blue-main active:bg-blue-100 active:text-blue-main",
    pink: "bg-pink-main text-white border-pink-main hover:text-pink-main active:bg-pink-100 active:text-pink-main",
    yellow:
      "bg-yellow-main text-white border-yellow-main hover:text-yellow-main active:bg-yellow-100 active:text-yellow-main",
    green:
      "bg-green-main text-white border-green-main hover:text-green-main active:bg-green-100 active:text-green-main",
    white:
      "bg-white text-blue-main border-white hover:text-white active:bg-white-100 active:text-white",
    gray: "bg-dark-blue-300 border-dark-blue-300 text-foreground active:bg-dark-blue-100 active:text-foreground",
  }[color];

  const outlinedColorClasses = {
    blue: "border-blue-main text-blue-main hover:text-white active:bg-blue-500 active:text-white",
    pink: "border-pink-main text-pink-main hover:text-white active:bg-pink-500 active:text-white",
    yellow:
      "border-yellow-main text-yellow-main hover:text-white active:bg-yellow-500 active:text-white",
    green:
      "border-green-main text-green-main hover:text-white active:bg-green-500 active:text-white",
    white:
      "border-white text-white hover:text-blue-main active:bg-white-500 active:text-blue-main",
    gray: "border-dark-blue-300 text-foreground active:bg-dark-blue-300",
  }[color];

  const colorClasses = isDisabled
    ? disabledClasses
    : outlined
    ? outlinedColorClasses
    : filledColorClasses;

  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-3",
    lg: "py-3 px-4",
    xl: "h-14 px-6",
  }[size];

  const classes = cn(
    "group relative flex-center w-fit border rounded-full cursor-pointer font-medium overflow-hidden transition-all duration-100 hover:transition-[color] hover:duration-500 ease-in-out [&_svg:not([class*='size-'])]:size-4",
    {
      "cursor-default": isDisabled,
    },
    sizeClasses,
    colorClasses,
    className
  );

  const rippleClasses = cn(
    "absolute group-active:opacity-0 -translate-x-1/2 -translate-y-1/2 w-0 group-hover:w-[200%] aspect-square rounded-full pointer-events-none transition-[width] duration-500 ease-in-out",
    {
      "bg-white": !outlined || color === "white",
      "bg-blue-main":
        (!outlined && color === "white") || (outlined && color === "blue"),
      "bg-pink-main": outlined && color === "pink",
      "bg-yellow-main": outlined && color === "yellow",
      "bg-green-main": outlined && color === "green",
      "bg-dark-blue-100": outlined && color === "gray",
    }
  );

  const inner = (
    <>
      <div
        className={rippleClasses}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          display: isDisabled ? "none" : "block",
        }}
      />
      <div className="w-full relative flex-center gap-2">
        {children}
        {linkIcon && <RightIcon className="size-6" />}
      </div>
    </>
  );

  const commonProps = {
    className: classes,
    onClick,
    onMouseEnter: updatePosition,
    onMouseMove: updatePosition,
    onMouseLeave: updatePosition,
  };

  if (href) {
    return (
      <Link
        href={href}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        {...commonProps}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      {...commonProps}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {inner}
    </button>
  );
};

export default Button;
