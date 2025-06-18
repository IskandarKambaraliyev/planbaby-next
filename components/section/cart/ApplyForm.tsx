"use client";

import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types";

const ApplyForm = ({ className }: PropsWithClassName) => {
  return (
    <div
      className={cn(
        "lg:sticky lg:top-30 lg:w-80 w-full bg-blue-200 p-4 rounded-3xl",
        className
      )}
    >
      ApplyForm
    </div>
  );
};

export default ApplyForm;
