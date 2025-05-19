"use client";

import { Link } from "@/i18n/navigation";
import { PropsWithClassName } from "@/types";
import { RightIcon } from "../icons";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
} & PropsWithClassName;
const Title = ({ className, children, href }: Props) => {
  const wrapperClasses = cn(
    "group text-2xl md:text-4xl font-bold",
    {
      "flex items-center gap-1 hover:text-blue-main w-fit": href,
    },
    className
  );
  if (href) {
    return (
      <Link href={href} className={wrapperClasses}>
        <span>{children}</span>
        <RightIcon className="size-6 text-dark-blue-400 group-hover:translate-x-2 transition" />
      </Link>
    );
  }
  return (
    <h2 className={wrapperClasses}>
      <span>{children}</span>
    </h2>
  );
};

export default Title;
