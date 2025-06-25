"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useId } from "react";
import React from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  startIcon?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  color?: "white" | "blue";
  size?: "md" | "lg";
  error?: string;
};

const Input: React.FC<Props> = ({
  label,
  startIcon,
  className,
  wrapperClassName,
  labelClassName,
  color = "white",
  size = "lg",
  error,
  disabled = false,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <>
      <div className={cn("relative w-full", wrapperClassName)}>
        <input
          {...props}
          id={inputId}
          disabled={disabled}
          placeholder=" "
          className={cn(
            "peer w-full rounded-full pr-4 placeholder-transparent outline-none border-2 border-transparent ring-4 ring-transparent hover:border-blue-main hover:bg-white focus:border-blue-main focus:ring-blue-300 focus:bg-white transition",
            {
              "bg-white": color === "white",
              "bg-blue-100": color === "blue",
              "h-11 pt-2.5 text-sm": size === "md",
              "h-14 pt-3 text-base": size === "lg",
              "pl-4": startIcon === undefined,
              "pl-11": startIcon !== undefined && size === "md",
              "pl-12": startIcon !== undefined && size === "lg",
              "!bg-dark-blue-100 !border-transparent !ring-transparent":
                disabled,
            },
            className
          )}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute text-xs text-blue-main transition-all duration-200 pointer-events-none line-clamp-1",
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-dark-blue-500 peer-placeholder-shown:text-sm",
              "peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-blue-main",
              {
                "!text-pink-main": error,
                "!text-dark-blue-400": disabled,
                "top-[calc(50%-1.25rem)] peer-focus:top-[calc(50%-1.25rem)]":
                  size === "md",
                "top-[calc(50%-1.375rem)] peer-focus:top-[calc(50%-1.375rem)]":
                  size === "lg",
                "left-4": startIcon === undefined,
                "left-11": startIcon !== undefined && size === "md",
                "left-12": startIcon !== undefined && size === "lg",
              },
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        {startIcon && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-4 flex-center text-dark-blue-400 peer-focus:text-blue-main transition pointer-events-none",
              {
                "size-5": size === "md",
                "size-6": size === "lg",
              }
            )}
          >
            {startIcon}
          </div>
        )}
      </div>
      {error && <p className="text-pink-main text-sm mt-1 px-4">{error}</p>}
    </>
  );
};

export default Input;
